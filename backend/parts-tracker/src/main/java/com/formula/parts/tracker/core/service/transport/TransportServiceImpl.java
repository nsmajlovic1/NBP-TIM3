package com.formula.parts.tracker.core.service.transport;

import com.formula.parts.tracker.core.mapper.TransportMapper;
import com.formula.parts.tracker.core.utility.DateTimeUtils;
import com.formula.parts.tracker.core.utility.LocationUtils;
import com.formula.parts.tracker.dao.model.Package;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.Transport;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.repository.AddressRepository;
import com.formula.parts.tracker.dao.repository.CarPartRepository;
import com.formula.parts.tracker.dao.repository.PackageRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.dao.repository.TransportCompanyRepository;
import com.formula.parts.tracker.dao.repository.TransportRepository;
import com.formula.parts.tracker.dao.repository.UserRepository;
import com.formula.parts.tracker.shared.constant.Constants;
import com.formula.parts.tracker.shared.constant.EmailTemplatePaths;
import com.formula.parts.tracker.shared.dto.email.EmailEvent;
import com.formula.parts.tracker.shared.dto.email.EmailRequest;
import com.formula.parts.tracker.shared.dto.email.context.TransportCompletionReminder;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.dto.transport.TransportCreateRequest;
import com.formula.parts.tracker.shared.dto.transport.TransportResponse;
import com.formula.parts.tracker.shared.enums.EmailSubject;
import com.formula.parts.tracker.shared.enums.NotificationSystem;
import com.formula.parts.tracker.shared.enums.Role;
import com.formula.parts.tracker.shared.enums.Status;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransportServiceImpl implements TransportService {

    private final TransportMapper transportMapper;
    private final TransportRepository transportRepository;
    private final TransportCompanyRepository transportCompanyRepository;
    private final AddressRepository addressRepository;
    private final TeamRepository teamRepository;
    private final PackageRepository packageRepository;
    private final CarPartRepository carPartRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

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
        final Optional<Team> userTeam = teamRepository.findByUserId(
            ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());

        final Map<Long, List<Package>> packagesByTransport =
            userTeam.isEmpty() ? packageRepository.findGroupedByTransport()
                : packageRepository.findByTeamIdGroupedByTransport(userTeam.get()
                    .getId());

        for (var transportEntry : packagesByTransport.entrySet()) {
            for (final Package pkg : transportEntry.getValue()) {
                pkg.setCarParts(carPartRepository.findByPackageId(pkg.getId()));
            }
        }

        final List<Transport> transports = transportRepository.findAll();

        for (final Transport transport : transports) {
            transport.setPackages(
                Optional.ofNullable(packagesByTransport.get(transport.getId())).orElse(
                    Collections.emptyList()));
        }

        return transportMapper.toResponses(transports);
    }

    @Override
    public List<StatisticResponse> countByStatus() {
        final StatisticResponse pendingCount = new StatisticResponse();
        pendingCount.setLabel(Status.PENDING.getValue());
        pendingCount.setCount(transportRepository.countByStatus(Status.PENDING.getValue()));

        final StatisticResponse inTransitCount = new StatisticResponse();
        inTransitCount.setLabel(Status.IN_TRANSIT.getValue());
        inTransitCount.setCount(transportRepository.countByStatus(Status.IN_TRANSIT.getValue()));

        final StatisticResponse finishedCount = new StatisticResponse();
        finishedCount.setLabel(Status.FINISHED.getValue());
        finishedCount.setCount(transportRepository.countByStatus(Status.FINISHED.getValue()));

        return List.of(pendingCount, inTransitCount, finishedCount);
    }

    @Override
    public void sendTransportCompletionReminders() {
        final List<Transport> todayTransports = transportRepository.findByExpectedArrivalDayAndStatus(
            LocalDate.now(), Status.IN_TRANSIT.getValue());

        for (final var transport : todayTransports) {
            final var packages = packageRepository.findByTransportId(transport.getId());

            final Map<Long, List<Package>> packagesGroupedByTeam = packages.stream()
                .collect(Collectors.groupingBy(Package::getTeamId));

            for (final Map.Entry<Long, List<Package>> entry : packagesGroupedByTeam.entrySet()) {
                final var teamId = entry.getKey();
                final var teamPackages = entry.getValue();

                final var teamLogistics = userRepository.findByRoleNameAndTeamId(
                    Role.LOGISTIC.getValue(), teamId);

                final List<String> reminderRecipients = teamLogistics.stream().map(User::getEmail)
                    .toList();

                final EmailRequest emailRequest = new EmailRequest();
                emailRequest.setTo(reminderRecipients);
                emailRequest.setSubject(EmailSubject.TRANSPORT_FINISHING_TODAY.getValue());
                emailRequest.setTemplatePath(EmailTemplatePaths.TRANSPORT_COMPLETION_REMINDER);

                final TransportCompletionReminder context = new TransportCompletionReminder();
                context.setTransportId(transport.getId().toString());
                context.setEndTime(DateTimeUtils.formatTime(transport.getExpectedArrivalDate()));
                context.setPackageCodes(teamPackages.stream().map(Package::getCode).toList());
                context.setFooterText(NotificationSystem.LOGISTICS_TEAM.getValue());
                context.setLocation(
                    LocationUtils.getDisplayName(transport.getDestinationAddress().getCityName(),
                        transport.getDestinationAddress().getStreetName()));

                emailRequest.setContext(Map.of(Constants.CONTEXT, context));

                applicationEventPublisher.publishEvent(new EmailEvent(this, emailRequest));
            }
        }

    }

}
