package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamMember extends Base {

    private Long userId;
    private Long teamId;

}
