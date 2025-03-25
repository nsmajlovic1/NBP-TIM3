package com.formula.parts.tracker.dao.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarPart extends Base {

    private String name;
    private LocalDateTime manufacturedAt;
    private String homologationNumber;
    private String description;
    private String status;
    private Long driverId;
    private Long storageId;
    private Long packageId;

}
