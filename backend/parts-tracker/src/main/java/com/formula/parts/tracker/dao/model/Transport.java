package com.formula.parts.tracker.dao.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Transport {

    private String type;
    private String vehicleNumber;
    private Long companyId;
    private LocalDateTime departureDate;
    private LocalDateTime expectedArrivalDate;
    private LocalDateTime actualArrivalDate;
    private Integer capacity;
    private String status;
    private Long departureAddressId;
    private Long destinationAddressId;


}
