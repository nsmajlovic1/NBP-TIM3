package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.authentication.AuthenticationService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.dto.user.PasswordChangeRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginRequest;
import com.formula.parts.tracker.shared.dto.user.UserLoginResponse;
import com.formula.parts.tracker.shared.dto.user.UserRegistrationRequest;
import com.formula.parts.tracker.shared.dto.user.UserResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Authentication API")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationRestService {

    private final AuthenticationService authenticationService;

    @PostMapping("login")
    public ResponseEntity<UserLoginResponse> login(
        @Valid @RequestBody final UserLoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("register")
    public ResponseEntity<UserResponse> register(
        @Valid @RequestBody final UserRegistrationRequest request) throws ApiException {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PatchMapping("password")
    public ResponseEntity<UserResponse> changePassword(
        @Valid @RequestBody final PasswordChangeRequest request) throws ApiException {
        return ResponseEntity.ok(authenticationService.changePassword(request));
    }

    @GetMapping("all")
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size){
        return ResponseEntity.ok(authenticationService.getAllUsers(search, page, size));
    }

}