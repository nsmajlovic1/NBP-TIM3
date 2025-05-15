package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.StorageReport;
import com.formula.parts.tracker.shared.dto.storagereport.StorageReportRequest;
import com.formula.parts.tracker.shared.dto.storagereport.StorageReportResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StorageReportMapper {

    StorageReport toEntity(StorageReportRequest request);

    StorageReportResponse toDto(StorageReport storageReport);
}
