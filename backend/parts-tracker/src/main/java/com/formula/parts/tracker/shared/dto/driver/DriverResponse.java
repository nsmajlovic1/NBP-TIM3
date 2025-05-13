package com.formula.parts.tracker.shared.dto.driver;

import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private String countryIso;
    private Long carNumber;
    private Long teamId;

}
