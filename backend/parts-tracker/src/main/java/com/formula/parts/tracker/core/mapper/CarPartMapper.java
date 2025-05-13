package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarPartMapper {

    CarPart toEntity(final CarPartRequest carPartRequest);

    CarPartResponse toCarPartResponse(final CarPart carPart);

    List<CarPartResponse> toCarPartResponses(final List<CarPart> carPartEntities);

}
