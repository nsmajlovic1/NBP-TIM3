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
import com.formula.parts.tracker.shared.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportCompanyServiceImpl implements TransportCompanyService {

    private final TransportCompanyRepository transportCompanyRepository;
    private final TransportCompanyMapper transportCompanyMapper;

    private static final String NAME = "name";

    @Override
    public TransportCompanyResponse create(final TransportCompanyRequest request) throws ApiException {
        validateUniqueFieldConstraint(transportCompanyRepository::existsByName,
                request.getName(), NAME);

        TransportCompany company = transportCompanyMapper.toEntity(request);
        company = transportCompanyRepository.persist(company);

        return transportCompanyMapper.toResponse(company);
    }

    @Override
    public Page<TransportCompanyResponse> getAllCompanies(String search, Long page, Long size) {
        List<TransportCompany> companies;
        Long totalElements;

        if (search != null && !search.trim().isEmpty()) {
            companies = transportCompanyRepository.findByNameLike(search, page, size);
            totalElements = transportCompanyRepository.countByNameLike(search);
        } else {
            companies = transportCompanyRepository.findAll(page, size);
            totalElements = transportCompanyRepository.countAll();
        }

        Long totalPages = (totalElements + size - 1) / size;

        Page<TransportCompanyResponse> pageResponse = new Page<>();
        pageResponse.setContent(companies.stream()
                .map(transportCompanyMapper::toResponse)
                .toList());
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }

    @Override
    public void deleteCompany(long id) throws ApiException {
        if (!transportCompanyRepository.existsById(id)) {
            throw new NotFoundException(String.format("Company with ID %d does not exist.", id));
        }

        transportCompanyRepository.deleteById(id);
    }

    private <T> void validateUniqueFieldConstraint(final Predicate<T> existsByField,
                                                   final T fieldValue, final String fieldName) throws BadRequestException {
        if (Boolean.TRUE.equals(existsByField.test(fieldValue))) {
            throw new BadRequestException(
                    String.format("Provided %s is already taken.", fieldName));
        }
    }


}
