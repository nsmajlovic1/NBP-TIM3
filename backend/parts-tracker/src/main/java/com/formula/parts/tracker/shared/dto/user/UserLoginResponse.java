package com.formula.parts.tracker.shared.dto.user;

import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String accessToken;
    private String role;
    private String username;
    private Long teamId;

}
