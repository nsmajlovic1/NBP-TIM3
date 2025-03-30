package com.formula.parts.tracker.shared.dto.user;

import jakarta.validation.constraints.NotBlank;
import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Username must be specified.")
    private String username;

    @NotBlank(message = "Password must be specified.")
    private String password;

}
