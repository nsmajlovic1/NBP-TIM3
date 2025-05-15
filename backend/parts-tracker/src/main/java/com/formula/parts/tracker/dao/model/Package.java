package com.formula.parts.tracker.dao.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Package extends Base {

    private String code;
    private String status;
    private Long shipmentId;
    private Long departureStorageId;
    private Long destinationStorageId;

    private List<CarPart> carParts;

}
