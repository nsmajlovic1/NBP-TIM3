package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Driver extends Base {

    private String firstName;
    private String lastName;
    private String countryIso;
    private Long carNumber;
    private Long teamId;

}
