package com.formula.parts.tracker.shared.dto.team;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamMemberResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
}
