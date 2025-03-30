package com.formula.parts.tracker.shared.dto.user;

import com.formula.parts.tracker.shared.validation.annotation.Password;
import jakarta.validation.constraints.NotBlank;
import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Password must be specified.")
    @Password
    private String newPassword;

}
