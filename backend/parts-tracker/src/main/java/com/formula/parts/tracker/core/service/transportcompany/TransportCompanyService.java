package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.exception.ApiException;

import java.util.List;

public interface TransportCompanyService {

    TransportCompanyResponse create(TransportCompanyRequest request) throws ApiException;

    Page<TransportCompanyResponse> getAllCompanies(String search, Long page, Long size);

    void deleteCompany (long id) throws ApiException;

}
