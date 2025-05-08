package com.formula.parts.tracker.core.service.carpart;

import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

public interface CarPartService {
    void createCarPart(CarPartRequest request) throws ApiException;
    CarPartResponse getCarPart (long id) throws ApiException;

}
