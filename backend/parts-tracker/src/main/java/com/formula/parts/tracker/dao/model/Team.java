package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team extends Base {

    private String name;
    private String description;
    private String countryIso;

}
