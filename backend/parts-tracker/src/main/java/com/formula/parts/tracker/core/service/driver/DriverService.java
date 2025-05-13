package com.formula.parts.tracker.core.service.driver;

import com.formula.parts.tracker.shared.dto.driver.DriverCreateRequest;
import com.formula.parts.tracker.shared.dto.driver.DriverResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import java.util.List;

public interface DriverService {

    DriverResponse create(final DriverCreateRequest request) throws ApiException;

    List<DriverResponse> getTeamDrivers() throws ApiException;

    List<DriverResponse> getAllDrivers();

}
