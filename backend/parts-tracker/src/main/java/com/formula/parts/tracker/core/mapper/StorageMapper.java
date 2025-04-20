package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.shared.dto.storage.StorageRequest;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StorageMapper {
    Storage toEntity(StorageRequest request);
    StorageResponse toResponse(Storage storage);
}
