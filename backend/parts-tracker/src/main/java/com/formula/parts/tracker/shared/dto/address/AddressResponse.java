package com.formula.parts.tracker.shared.dto.address;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class AddressResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String streetName;
    private String cityName;
    private String countryIso;
}
