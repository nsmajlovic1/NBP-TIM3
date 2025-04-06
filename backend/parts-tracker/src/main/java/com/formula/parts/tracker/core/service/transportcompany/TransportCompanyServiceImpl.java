package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.core.mapper.TransportCompanyMapper;
import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.dao.repository.TransportCompanyRepository;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportCompanyServiceImpl implements TransportCompanyService {

    private final TransportCompanyRepository transportCompanyRepository;
    private final TransportCompanyMapper transportCompanyMapper;

    @Override
    public Page<TransportCompanyResponse> get() {
        final List<TransportCompany> transportCompanies = transportCompanyRepository.findAll();

        final Page<TransportCompanyResponse> response = new Page<>();
        response.setContent(transportCompanyMapper.toResponses(transportCompanies));

        return response;
    }

    @Override
    public TransportCompanyResponse create(final TransportCompanyRequest request) {
        TransportCompany company = transportCompanyMapper.toEntity(request);
        company = transportCompanyRepository.persist(company);
        return transportCompanyMapper.toResponse(company);
    }


}
