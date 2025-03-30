package com.formula.parts.tracker.shared.dto.user;

import com.formula.parts.tracker.shared.validation.annotation.Password;
import com.formula.parts.tracker.shared.validation.annotation.Username;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "First name must be specified.")
    private String firstName;

    @NotBlank(message = "Last name must be specified.")
    private String lastName;

    @NotBlank(message = "Email address must be specified.")
    @Email(message = "Email address is not valid.")
    private String email;

    @NotBlank(message = "Password must be specified.")
    @Password
    private String password;

    @NotBlank(message = "Username must be specified.")
    @Username
    private String username;

    @NotBlank(message = "Phone number must be specified.")
    private String phoneNumber;

    @NotNull(message = "Birth date must be specified.")
    private LocalDateTime birthDate;

    @NotNull(message = "Role ID must be specified")
    private Long roleId;

    private Long addressId;

}
