package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toEntity(final AddressRequest addressRequest);

    AddressResponse toAddressResponse(final Address address);
}
