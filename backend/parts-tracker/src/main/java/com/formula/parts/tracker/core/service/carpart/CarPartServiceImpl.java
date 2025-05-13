package com.formula.parts.tracker.core.service.carpart;

import com.formula.parts.tracker.core.mapper.CarPartMapper;
import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.dao.model.Driver;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.repository.CarPartRepository;
import com.formula.parts.tracker.dao.repository.DriverRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.enums.Status;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import com.formula.parts.tracker.shared.exception.UnauthorizedException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class CarPartServiceImpl implements CarPartService {

    private final CarPartRepository carPartRepository;
    private final TeamRepository teamRepository;
    private final DriverRepository driverRepository;
    private final CarPartMapper carPartMapper;

    private static final String NAME = "name";

    @Override
    public void createCarPart(final CarPartRequest request) throws ApiException {
        final Optional<Team> userTeam = teamRepository.findByUserId(
            ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());

        final Optional<Driver> driver = driverRepository.findById(request.getDriverId());

        if (driver.isEmpty()) {
            throw new BadRequestException("Requested driver does not exist.");
        }

        if (userTeam.isEmpty() || !userTeam.get().getId().equals(driver.get().getTeamId())) {
            throw new UnauthorizedException(
                "Authenticated user is unauthorized to create this car part.");
        }

        request.setStatus(Status.IN_STORAGE.getValue());
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

    @Override
    public Page<CarPartResponse> getAll(final String search, final Long page, final Long size)
        throws ApiException {
        final Optional<Team> relatedTeam = teamRepository.findByUserId(
            ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());

        if (relatedTeam.isEmpty()) {
            throw new UnauthorizedException(
                "Authenticated user is unauthorized to access car parts.");
        }

        List<CarPart> carParts;
        final Long totalElements;

        if (StringUtils.hasLength(search)) {
            carParts = carPartRepository.findByNameLike(search, page, size,
                relatedTeam.get().getId());

            totalElements = carPartRepository.countByNameLike(search, relatedTeam.get().getId());
        } else {
            carParts = carPartRepository.findAll(page, size, relatedTeam.get().getId());
            totalElements = carPartRepository.countAll(relatedTeam.get().getId());
        }

        final Long totalPages = (totalElements + size - 1) / size;

        final Page<CarPartResponse> pageResponse = new Page<>();
        pageResponse.setContent(carPartMapper.toCarPartResponses(carParts));
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }

}
