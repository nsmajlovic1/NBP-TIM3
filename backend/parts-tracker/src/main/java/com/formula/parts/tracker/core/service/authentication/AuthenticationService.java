package com.formula.parts.tracker.core.service.authentication;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.dto.user.PasswordChangeRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginResponse;
import com.formula.parts.tracker.shared.dto.user.UserRegistrationRequest;
import com.formula.parts.tracker.shared.dto.user.UserResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {

    UserLoginResponse login(final UserLoginRequest request);

    UserResponse register(final UserRegistrationRequest request) throws ApiException;

    UserResponse changePassword(final PasswordChangeRequest request) throws ApiException;

    String getAccessTokenOwner(final String accessToken);

    boolean isAccessTokenValid(final String accessToken, final UserDetails userDetails);

    Page<UserResponse> getAllUsers(String search, Long page, Long size);

}
