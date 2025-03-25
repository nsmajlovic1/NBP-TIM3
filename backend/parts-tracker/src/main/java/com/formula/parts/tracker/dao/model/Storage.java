package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Storage extends Base {

    private Integer capacity;
    private Long teamId;
    private Long addressId;

}
