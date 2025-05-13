package com.formula.parts.tracker.core.service.transport;

import com.formula.parts.tracker.core.mapper.TransportMapper;
import com.formula.parts.tracker.dao.model.Transport;
import com.formula.parts.tracker.dao.repository.AddressRepository;
import com.formula.parts.tracker.dao.repository.TransportCompanyRepository;
import com.formula.parts.tracker.dao.repository.TransportRepository;
import com.formula.parts.tracker.shared.dto.transport.TransportCreateRequest;
import com.formula.parts.tracker.shared.dto.transport.TransportResponse;
import com.formula.parts.tracker.shared.enums.Status;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportServiceImpl implements TransportService {

    private final TransportMapper transportMapper;
    private final TransportRepository transportRepository;
    private final TransportCompanyRepository transportCompanyRepository;
    private final AddressRepository addressRepository;

    @Override
    public TransportResponse create(final TransportCreateRequest request) throws ApiException {
        if (!request.getDepartureDate().isBefore(request.getArrivalDate())) {
            throw new BadRequestException("Departure date must be before arrival date.");
        }

        if (!transportCompanyRepository.existsById(request.getCompanyId())) {
            throw new NotFoundException("Requested transport company does not exist.");
        }

        if (!addressRepository.existsById(request.getDepartureAddressId())) {
            throw new NotFoundException("Requested departure address does not exist.");
        }
        if (!addressRepository.existsById(request.getDestinationAddressId())) {
            throw new NotFoundException("Requested destination address does not exist.");
        }

        final Transport transport = transportMapper.toEntity(request);
        transport.setStatus(Status.PENDING.getValue());

        return transportMapper.toResponse(transportRepository.persist(transport));
    }

    @Override
    public List<TransportResponse> getAll() throws ApiException {
        return transportMapper.toResponses(transportRepository.findAll());
    }

    @Override
    public void delete(Long transportId) {

    }

}
