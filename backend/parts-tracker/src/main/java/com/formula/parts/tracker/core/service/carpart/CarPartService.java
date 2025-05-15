package com.formula.parts.tracker.core.service.carpart;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import java.util.List;

public interface CarPartService {

    void createCarPart(CarPartRequest request) throws ApiException;

    CarPartResponse getCarPart(long id) throws ApiException;

    Page<CarPartResponse> getAll(final String search, final Long page, final Long size)
        throws ApiException;

    List<StatisticResponse> countByStatus() throws ApiException;

}
