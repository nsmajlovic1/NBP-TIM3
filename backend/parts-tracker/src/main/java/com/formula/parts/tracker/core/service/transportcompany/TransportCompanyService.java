package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

import java.util.List;

public interface TransportCompanyService {

    Page<TransportCompanyResponse> get();

    TransportCompanyResponse create(TransportCompanyRequest request) throws ApiException;

    List<TransportCompanyResponse> getAllCompanies(String search);

}
