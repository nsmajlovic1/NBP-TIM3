package com.formula.parts.tracker.shared.dto.storagereport;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class StorageReportRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @NotNull(message = "Storage ID is required.")
    private Long storageId;

    @NotNull(message = "Capacity is required.")
    private Integer capacity;

    @NotNull(message = "Team ID is required.")
    private Long teamId;

    @NotNull(message = "Current parts count is required.")
    private Integer currentPartsCount;

    @NotNull(message = "Address ID is required.")
    private Long addressId;
}
