package com.formula.parts.tracker.shared.dto.team;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
@Getter
@Setter
public class TeamRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Team name is required.")
    private String name;

    private String description;

    @NotBlank(message = "Country ISO is required.")
    private String countryIso;
}
