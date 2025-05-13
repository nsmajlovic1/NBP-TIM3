package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Transport;
import com.formula.parts.tracker.shared.dto.transport.TransportCreateRequest;
import com.formula.parts.tracker.shared.dto.transport.TransportResponse;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AddressMapper.class, TransportCompanyMapper.class})
public interface TransportMapper {

    @Mapping(target = "expectedArrivalDate", source = "arrivalDate")
    Transport toEntity(final TransportCreateRequest transportCreateRequest);

    @Mapping(target = "arrivalDate", source = "expectedArrivalDate")
    TransportResponse toResponse(final Transport transportEntity);

    List<TransportResponse> toResponses(final List<Transport> transportEntities);

}