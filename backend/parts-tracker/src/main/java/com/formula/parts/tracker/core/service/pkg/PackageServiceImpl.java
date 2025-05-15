package com.formula.parts.tracker.core.service.pkg;

import com.formula.parts.tracker.core.mapper.PackageMapper;
import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.dao.model.Package;
import com.formula.parts.tracker.dao.model.Shipment;
import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.Transport;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.repository.CarPartRepository;
import com.formula.parts.tracker.dao.repository.PackageRepository;
import com.formula.parts.tracker.dao.repository.ShipmentRepository;
import com.formula.parts.tracker.dao.repository.StorageRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.dao.repository.TransportRepository;
import com.formula.parts.tracker.shared.dto.pkg.PackageCreateRequest;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.enums.Status;
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
public class PackageServiceImpl implements PackageService {

    private final TeamRepository teamRepository;
    private final TransportRepository transportRepository;
    private final StorageRepository storageRepository;
    private final PackageRepository packageRepository;
    private final CarPartRepository carPartRepository;
    private final ShipmentRepository shipmentRepository;
    private final PackageMapper packageMapper;

    @Override
    public PackageResponse create(final PackageCreateRequest request)
        throws ApiException {
        final Team userTeam = teamRepository.findByUserId(
                ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId())
            .orElseThrow(() -> new UnauthorizedException(
                "Authenticated user is unauthorized to create this package."));

        final Transport transport = transportRepository.findById(request.getTransportId())
            .orElseThrow(() -> new BadRequestException("Requested transport does not exist."));

        if (!Status.PENDING.getValue().equals(transport.getStatus())) {
            throw new BadRequestException("Transport is not in status Pending.");
        }

        final Storage departureStorage = storageRepository
            .findByTeamIdAndAddressId(userTeam.getId(), transport.getDepartureAddressId())
            .orElseThrow(() -> new BadRequestException(
                "Team does not own storage available on transport departure address."));

        final Storage destinationStorage = storageRepository
            .findByTeamIdAndAddressId(userTeam.getId(), transport.getDestinationAddressId())
            .orElseThrow(() -> new BadRequestException(
                "Team does not own storage available on transport destination address."));

        final List<CarPart> carParts = carPartRepository.findByIdsAndTeamIdAndStatus(
            request.getCarParts(),
            userTeam.getId(), Status.IN_STORAGE.getValue(), transport.getDepartureAddressId());

        if (request.getCarParts().stream().anyMatch(
            carPart -> !carParts.stream().map(CarPart::getId).toList().contains(carPart))) {
            throw new BadRequestException(
                "Car parts must belong to a team and be in a storage unit with departure address!");
        }

        final List<Package> packages = packageRepository.findByTransportIdAndTeamId(
            request.getTransportId(), userTeam.getId());

        final Long shipmentId = !packages.isEmpty() ? packages.stream().findAny().get()
            .getShipmentId()
            : shipmentRepository.persist(new Shipment(transport.getStatus(), transport.getId()));

        final Package pkg = new Package();
        pkg.setCode(request.getCode());
        pkg.setStatus(transport.getStatus());
        pkg.setShipmentId(shipmentId);
        pkg.setDepartureStorageId(departureStorage.getId());
        pkg.setDestinationStorageId(destinationStorage.getId());

        final Package newPackage = packageRepository.persist(pkg);

        carPartRepository.updatePackageIdAndStatusSetStorageIdNull(request.getCarParts(),
            newPackage.getId(),
            transport.getStatus());

        return packageMapper.toResponse(newPackage);
    }

    @Override
    public List<StatisticResponse> countByStatus() throws ApiException {
        final Optional<Team> userTeam = teamRepository.findByUserId(
            ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());

        final StatisticResponse pendingCount = new StatisticResponse();
        pendingCount.setLabel(Status.PENDING.getValue());
        pendingCount.setCount(
            userTeam.map(team -> packageRepository.countByTeamIdAndStatus(team
                    .getId(), Status.PENDING.getValue()))
                .orElseGet(() -> packageRepository.countByStatus(Status.PENDING.getValue())));

        final StatisticResponse inTransitCount = new StatisticResponse();
        inTransitCount.setLabel(Status.IN_TRANSIT.getValue());
        inTransitCount.setCount(
            userTeam.map(team -> packageRepository.countByTeamIdAndStatus(team
                    .getId(), Status.IN_TRANSIT.getValue()))
                .orElseGet(() -> packageRepository.countByStatus(Status.IN_TRANSIT.getValue())));

        final StatisticResponse finishedCount = new StatisticResponse();
        finishedCount.setLabel(Status.FINISHED.getValue());
        finishedCount.setCount(
            userTeam.map(team -> packageRepository.countByTeamIdAndStatus(team
                    .getId(), Status.FINISHED.getValue()))
                .orElseGet(() -> packageRepository.countByStatus(Status.IN_TRANSIT.getValue())));

        return List.of(pendingCount, inTransitCount, finishedCount);
    }

}
