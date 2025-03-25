package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Shipment extends Base {

    private String status;
    private Long transportId;

}
