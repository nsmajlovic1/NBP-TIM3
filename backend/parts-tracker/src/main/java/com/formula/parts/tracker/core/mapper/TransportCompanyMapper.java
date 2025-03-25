package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.dto.TransportCompanyResponse;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransportCompanyMapper {

    TransportCompanyResponse toResponse(final TransportCompany source);

    List<TransportCompanyResponse> toResponses(final List<TransportCompany> source);

}
