package com.formula.parts.tracker.core.service.authentication;

import com.formula.parts.tracker.core.mapper.UserMapper;
import com.formula.parts.tracker.core.service.email.EmailService;
import com.formula.parts.tracker.core.utility.JwtUtils;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.repository.RoleRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.dao.repository.UserRepository;
import com.formula.parts.tracker.shared.constant.Constants;
import com.formula.parts.tracker.shared.constant.EmailTemplatePaths;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.email.EmailEvent;
import com.formula.parts.tracker.shared.dto.email.EmailRequest;
import com.formula.parts.tracker.shared.dto.email.context.UserAccessCredentials;
import com.formula.parts.tracker.shared.dto.user.PasswordChangeRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginResponse;
import com.formula.parts.tracker.shared.dto.user.UserRegistrationRequest;
import com.formula.parts.tracker.shared.dto.user.UserResponse;
import com.formula.parts.tracker.shared.enums.EmailSubject;
import com.formula.parts.tracker.shared.enums.NotificationSystem;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TeamRepository teamRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Value("${access.token.expiration.minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${access.token.secret}")
    private String accessTokenSecret;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    private static final String AUTHORITIES = "authorities";
    private static final String USERNAME = "username";
    private static final String EMAIL = "email";

    private String generateAccessToken(final UserDetails userDetails) {
        final Map<String, Object> claims = new HashMap<>();

        claims.put(AUTHORITIES,
            userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());

        return JwtUtils.generateJwt(claims, jwtIssuer, userDetails.getUsername(),
            accessTokenExpirationMinutes * (long) 60000, accessTokenSecret);
    }

    @Override
    public UserLoginResponse login(final UserLoginRequest request) {
        final Authentication authenticationData = new UsernamePasswordAuthenticationToken(
            request.getUsername(), request.getPassword());

        final Authentication authenticationResult = authenticationManager.authenticate(
            authenticationData);
        final User authenticatedUser = (User) authenticationResult.getPrincipal();

        final UserLoginResponse response = new UserLoginResponse();
        response.setUsername(authenticatedUser.getUsername());
        response.setAccessToken(generateAccessToken(authenticatedUser));
        response.setRole(authenticatedUser.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse(null));

        response.setTeamId(
            teamRepository.findByUserId(authenticatedUser.getId()).map(Team::getId).orElse(null));

        return response;
    }

    @Override
    public UserResponse register(final UserRegistrationRequest request) throws ApiException {
        validateUniqueFieldConstraint(userRepository::existsByUsername,
            request.getUsername(), USERNAME);
        validateUniqueFieldConstraint(userRepository::existsByEmail,
            request.getEmail(), EMAIL);

        if (!roleRepository.existsByUsername(request.getRoleId())) {
            throw new NotFoundException("Role with provided ID does not exist.");
        }

        User userEntity = userMapper.toEntity(request);
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));

        userEntity = userRepository.persist(userEntity);

        applicationEventPublisher.publishEvent(new EmailEvent(this, getUserRegistrationEmailRequest(
            request, userEntity)));

        return userMapper.toUserResponse(userEntity);
    }

    private static EmailRequest getUserRegistrationEmailRequest(
        final UserRegistrationRequest request,
        final User userEntity) {
        final UserAccessCredentials context = new UserAccessCredentials();
        context.setFirstName(userEntity.getFirstName());
        context.setLastName(userEntity.getLastName());
        context.setUsername(userEntity.getUsername());
        context.setPassword(request.getPassword());
        context.setFooterText(NotificationSystem.USER_REGISTRATION.getValue());

        final EmailRequest emailRequest = new EmailRequest();
        emailRequest.setTo(List.of(userEntity.getEmail()));
        emailRequest.setContext(Map.of(Constants.CONTEXT, context));
        emailRequest.setSubject(EmailSubject.USER_ACCESS_CREDENTIALS.getValue());
        emailRequest.setTemplatePath(EmailTemplatePaths.USER_ACCESS_CREDENTIALS);
        return emailRequest;
    }

    private <T> void validateUniqueFieldConstraint(final Predicate<T> existsByField,
        final T fieldValue, final String fieldName) throws BadRequestException {
        if (Boolean.TRUE.equals(existsByField.test(fieldValue))) {
            throw new BadRequestException(
                String.format("Provided %s is already taken.", fieldName));
        }
    }

    @Override
    public UserResponse changePassword(final PasswordChangeRequest request) throws ApiException {
        final User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        userRepository.updatePassword(authenticatedUser.getUsername(),
            passwordEncoder.encode(request.getNewPassword()));

        final User user = userRepository.findByUsername(authenticatedUser.getUsername()).get();
        return userMapper.toUserResponse(user);
    }

    @Override
    public String getAccessTokenOwner(String accessToken) {
        return JwtUtils.extractSubject(accessToken, accessTokenSecret);
    }

    @Override
    public boolean isAccessTokenValid(final String accessToken, final UserDetails userDetails) {
        final String username = JwtUtils.extractSubject(accessToken, accessTokenSecret);
        return username.equals(userDetails.getUsername()) && !JwtUtils.isJwtExpired(accessToken,
            accessTokenSecret);
    }

    @Override
    public Page<UserResponse> getAllUsers(String search, Long page, Long size) {
        List<User> users = new ArrayList<>();
        Long totalElements = 0L;

        if (search != null && !search.trim().isEmpty()) {
            users = userRepository.findByRoleName(search, page, size);
            totalElements = userRepository.countByRoleName(search);
        }

        Long totalPages = (totalElements + size - 1) / size;

        Page<UserResponse> pageResponse = new Page<>();
        pageResponse.setContent(users.stream()
            .map(userMapper::toUserResponse)
            .toList());
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }

}
