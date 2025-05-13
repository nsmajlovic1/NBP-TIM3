package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Driver;
import com.formula.parts.tracker.shared.dto.driver.DriverCreateRequest;
import com.formula.parts.tracker.shared.dto.driver.DriverResponse;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DriverMapper {

    Driver toEntity(final DriverCreateRequest driverCreateRequestRequest);

    DriverResponse toResponse(final Driver driverEntity);

    List<DriverResponse> toResponses(final List<Driver> driverEntities);

}