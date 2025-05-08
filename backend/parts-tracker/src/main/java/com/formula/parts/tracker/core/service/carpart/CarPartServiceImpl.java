package com.formula.parts.tracker.core.service.carpart;

import com.formula.parts.tracker.core.mapper.CarPartMapper;
import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.repository.CarPartRepository;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarPartServiceImpl implements CarPartService {

    private final CarPartRepository carPartRepository;
    private final CarPartMapper carPartMapper;

    private static final String NAME = "name";

    @Override
    public void createCarPart(CarPartRequest request) {
        request.setStatus("PENDING");
        CarPart entity = carPartMapper.toEntity(request);
        carPartRepository.persist(entity);
    }

    @Override
    public CarPartResponse getCarPart(long id) throws ApiException {
        if (!carPartRepository.existsById(id)) {
            throw new NotFoundException(String.format("Car part with ID %d does not exist.", id));
        }

        CarPart carPart = carPartRepository.findById(id);
        CarPartResponse response = new CarPartResponse();
        response.setId(carPart.getId());
        response.setName(carPart.getName());
        response.setDescription(carPart.getDescription());
        response.setDriverId(carPart.getDriverId());
        response.setStorageId(carPart.getStorageId());
        response.setPackageId(carPart.getPackageId());
        response.setHomologationNumber(carPart.getHomologationNumber());
        response.setStatus(carPart.getStatus());
        response.setWeight(carPart.getWeight());
        return response;
    }
}
