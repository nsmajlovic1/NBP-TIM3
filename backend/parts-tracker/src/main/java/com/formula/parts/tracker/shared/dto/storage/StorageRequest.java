package com.formula.parts.tracker.shared.dto.storage;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class StorageRequest implements Serializable{
    @Serial
    private static final long serialVersionUID = 1L;

    @NotNull(message = "Capacity is required.")
    private Integer capacity;

    @NotNull(message = "Team id is required.")
    private Long teamId;

    @NotNull(message = "Address id is required.")
    private Long addressId;
}
