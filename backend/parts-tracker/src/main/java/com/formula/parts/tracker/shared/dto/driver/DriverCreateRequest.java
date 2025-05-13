package com.formula.parts.tracker.shared.dto.driver;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverCreateRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "First name must be specified.")
    private String firstName;

    @NotBlank(message = "Last name must be specified.")
    private String lastName;

    @NotBlank(message = "Country ISO must be specified.")
    private String countryIso;

    @NotNull(message = "Car number must be specified.")
    private Long carNumber;

    @NotNull(message = "Team ID must be specified.")
    private Long teamId;

}