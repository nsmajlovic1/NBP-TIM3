package com.formula.parts.tracker.core.service.storage;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.storage.StorageRequest;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

import java.util.List;

public interface StorageService {
    StorageResponse create(StorageRequest request) throws ApiException;;
    Page<StorageResponse> getAllStorages(Long page, Long size);
    StorageResponse getStorage (long id) throws ApiException;
}
