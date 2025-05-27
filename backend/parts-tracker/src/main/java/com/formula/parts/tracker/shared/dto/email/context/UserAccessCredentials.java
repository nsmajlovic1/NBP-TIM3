package com.formula.parts.tracker.shared.dto.email.context;


import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAccessCredentials implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String footerText;

}
