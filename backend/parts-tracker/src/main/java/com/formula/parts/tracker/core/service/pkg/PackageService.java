package com.formula.parts.tracker.core.service.pkg;

import com.formula.parts.tracker.shared.dto.pkg.PackageCreateRequest;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

public interface PackageService {

    PackageResponse create(final PackageCreateRequest request) throws ApiException;

}
