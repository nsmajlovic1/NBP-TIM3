package com.formula.parts.tracker.core.service.address;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

public interface AddressService {
    AddressResponse create(AddressRequest request) throws ApiException;
    Page<AddressResponse> getAllAddresses(String search, Long page, Long size);
}
