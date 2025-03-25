package com.formula.parts.tracker.dao.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User extends Base {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
    private LocalDateTime birthDate;
    private Long addressId;
    private Long roleId;

}
