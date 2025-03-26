package com.formula.parts.tracker.dao.model;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address extends Base {
    private String streetName;
    private String cityName;
    private String countryIso;
}
