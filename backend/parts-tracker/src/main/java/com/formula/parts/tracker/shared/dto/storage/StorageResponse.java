package com.formula.parts.tracker.shared.dto.storage;

import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.team.TeamResponse;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class StorageResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private Integer capacity;
    private TeamResponse team;
    private AddressResponse location;
}
