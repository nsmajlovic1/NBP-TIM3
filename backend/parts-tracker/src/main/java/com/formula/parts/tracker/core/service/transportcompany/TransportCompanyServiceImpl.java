package com.formula.parts.tracker.core.service.transportcompany;

import com.formula.parts.tracker.core.mapper.TransportCompanyMapper;
import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.dao.repository.TransportCompanyRepository;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import java.util.List;
import java.util.function.Predicate;

import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportCompanyServiceImpl implements TransportCompanyService {

    private final TransportCompanyRepository transportCompanyRepository;
    private final TransportCompanyMapper transportCompanyMapper;

    private static final String NAME = "name";

    @Override
    public Page<TransportCompanyResponse> get() {
        final List<TransportCompany> transportCompanies = transportCompanyRepository.findAll();

        final Page<TransportCompanyResponse> response = new Page<>();
        response.setContent(transportCompanyMapper.toResponses(transportCompanies));

        return response;
    }

    @Override
    public TransportCompanyResponse create(final TransportCompanyRequest request) throws ApiException {
        validateUniqueFieldConstraint(transportCompanyRepository::existsByName,
                request.getName(), NAME);

        TransportCompany company = transportCompanyMapper.toEntity(request);
        company = transportCompanyRepository.persist(company);

        return transportCompanyMapper.toResponse(company);
    }

    @Override
    public List<TransportCompanyResponse> getAllCompanies(String search) {
        List<TransportCompany> companies;

        if (search != null && !search.trim().isEmpty()) {
            companies = transportCompanyRepository.findByNameLike(search);
        } else {
            companies = transportCompanyRepository.findAll();
        }

        return companies.stream()
                .map(transportCompanyMapper::toResponse)
                .toList();
    }

    private <T> void validateUniqueFieldConstraint(final Predicate<T> existsByField,
                                                   final T fieldValue, final String fieldName) throws BadRequestException {
        if (Boolean.TRUE.equals(existsByField.test(fieldValue))) {
            throw new BadRequestException(
                    String.format("Provided %s is already taken.", fieldName));
        }
    }


}
