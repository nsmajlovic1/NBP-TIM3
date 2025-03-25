package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.dto.Page;
import com.formula.parts.tracker.dto.TransportCompanyResponse;

public interface TransportCompanyService {

    Page<TransportCompanyResponse> get();

}
