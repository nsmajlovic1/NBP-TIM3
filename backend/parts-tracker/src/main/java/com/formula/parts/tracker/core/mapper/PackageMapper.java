package com.formula.parts.tracker.core.mapper;

import com.formula.parts.tracker.dao.model.Package;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PackageMapper {

    PackageResponse toResponse(final Package packageEntity);

}
