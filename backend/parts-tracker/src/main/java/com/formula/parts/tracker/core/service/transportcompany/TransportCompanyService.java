package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;

public interface TransportCompanyService {

    Page<TransportCompanyResponse> get();

    TransportCompanyResponse create(TransportCompanyRequest request);



}
