package com.formula.parts.tracker.core.service.driver;

import com.formula.parts.tracker.core.mapper.DriverMapper;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.repository.DriverRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.shared.dto.driver.DriverCreateRequest;
import com.formula.parts.tracker.shared.dto.driver.DriverResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import com.formula.parts.tracker.shared.exception.UnauthorizedException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverMapper driverMapper;
    private final DriverRepository driverRepository;
    private final TeamRepository teamRepository;

    @Override
    public DriverResponse create(final DriverCreateRequest request) throws ApiException {
        if (!teamRepository.existsById(request.getTeamId())) {
            throw new BadRequestException("Requested team does not exist.");
        }

        return driverMapper.toResponse(driverRepository.persist(driverMapper.toEntity(request)));
    }

    @Override
    public List<DriverResponse> getTeamDrivers() throws ApiException {
        final Optional<Team> relatedTeam = teamRepository.findByUserId(
            ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());

        if (relatedTeam.isEmpty()) {
            throw new UnauthorizedException(
                "Authenticated user is unauthorized to access team drivers.");
        }

        if (!teamRepository.existsById(relatedTeam.get().getId())) {
            throw new BadRequestException("Requested team does not exist.");
        }

        return driverMapper.toResponses(driverRepository.findByTeamId(relatedTeam.get().getId()));
    }

    @Override
    public List<DriverResponse> getAllDrivers() {
        return driverMapper.toResponses(driverRepository.findAll());
    }

}
