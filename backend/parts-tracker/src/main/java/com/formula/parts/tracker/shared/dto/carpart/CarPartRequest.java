package com.formula.parts.tracker.shared.dto.carpart;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarPartRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotNull(message = "Driver ID is required.")
    private Long driverId;

    private Long storageId;

    @NotBlank(message = "Car Part name is required.")
    private String name;

    @NotNull(message = "Manufactured date must be specified.")
    private LocalDateTime manufacturedAt;

    @NotBlank(message = "Homologation number is required.")
    private String homologationNumber;

    private String description;

    private Long packageId;
    private String status;

    @NotNull(message = "Weight is required.")
    private Integer weight;

}
