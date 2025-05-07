package com.formula.parts.tracker.shared.dto.carpart;

import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
public class CarPartResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long driverId;
    private Long storageId;
    private String name;
    private LocalDateTime manufacturedAt;
    private String homologationNumber;
    private String description;
    private Long packageId;
    private Integer weight;
    private String status;
}
