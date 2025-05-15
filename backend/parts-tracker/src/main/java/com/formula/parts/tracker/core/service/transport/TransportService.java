package com.formula.parts.tracker.core.service.transport;

import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.dto.transport.TransportCreateRequest;
import com.formula.parts.tracker.shared.dto.transport.TransportResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import java.util.List;

public interface TransportService {

    TransportResponse create(final TransportCreateRequest request) throws ApiException;

    List<TransportResponse> getAll() throws ApiException;

    List<StatisticResponse> countByStatus();

}
