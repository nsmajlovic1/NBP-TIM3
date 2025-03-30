package com.formula.parts.tracker.dao.model;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
public class User extends Base implements UserDetails, Principal {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
    private LocalDateTime birthDate;
    private Long addressId;
    private Long roleId;

    private transient Role role;

    @Override
    public String getName() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Optional.ofNullable(role)
            .map(roleItem -> List.of(new SimpleGrantedAuthority(roleItem.getName())))
            .orElse(Collections.emptyList());
    }
    
}
