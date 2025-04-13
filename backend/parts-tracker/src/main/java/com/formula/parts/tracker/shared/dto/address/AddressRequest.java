package com.formula.parts.tracker.shared.dto.address;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class AddressRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Street name is required.")
    private String streetName;

    @NotBlank(message = "City name is required.")
    private String cityName;

    @NotBlank(message = "Country ISO is required.")
    private String countryIso;
}
