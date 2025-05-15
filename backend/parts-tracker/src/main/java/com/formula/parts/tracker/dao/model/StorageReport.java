package com.formula.parts.tracker.dao.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StorageReport {

    private Long storageId;
    private Integer capacity;
    private Long teamId;
    private Integer currentPartsCount; // Corresponds to the COUNT of car parts in the view
    private String cityName;  // New field for city
    private String countryIso; // New field for country code
    private String streetName; // New field for street name
    private Double occupancyPercent; // New field for occupancy percentage
    private Double totalWeight;  // New field for total weight
}
