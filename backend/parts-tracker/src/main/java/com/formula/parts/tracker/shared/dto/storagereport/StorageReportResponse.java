package com.formula.parts.tracker.shared.dto.storagereport;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class StorageReportResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long storageId;
    private Integer capacity;
    private Long teamId;
    private Integer currentPartsCount;
    private Long addressId;
}
