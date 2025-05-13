package com.formula.parts.tracker.shared.dto.team;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public class TeamResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String description;
    private String countryIso;
    private List<TeamMemberResponse> teamMembers;
}
