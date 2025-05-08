package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarPartMapper {
    CarPart toEntity(final CarPartRequest carPartRequest);

    CarPartResponse toCarPartResponse(final CarPart carPart);
}
