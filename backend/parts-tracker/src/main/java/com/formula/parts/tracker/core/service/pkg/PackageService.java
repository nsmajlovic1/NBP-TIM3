package com.formula.parts.tracker.core.service.pkg;

import com.formula.parts.tracker.shared.dto.pkg.PackageCreateRequest;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import java.util.List;

public interface PackageService {

    PackageResponse create(final PackageCreateRequest request) throws ApiException;

    List<StatisticResponse> countByStatus() throws ApiException;

}
