package com.formula.parts.tracker.core.service.storage;

import com.formula.parts.tracker.core.mapper.AddressMapper;
import com.formula.parts.tracker.core.mapper.StorageMapper;
import com.formula.parts.tracker.core.mapper.TeamMapper;
import com.formula.parts.tracker.core.mapper.TransportCompanyMapper;
import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.dao.repository.AddressRepository;
import com.formula.parts.tracker.dao.repository.StorageRepository;
import com.formula.parts.tracker.dao.repository.TeamRepository;
import com.formula.parts.tracker.dao.repository.TransportCompanyRepository;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.storage.StorageRequest;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService{
    private final StorageRepository storageRepository;
    private final StorageMapper storageMapper;
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;
    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    private static final String TEAM_ID = "team_id";

    @Override
    public StorageResponse create(final StorageRequest request) throws ApiException {

        Storage storage = storageMapper.toEntity(request);
        storage = storageRepository.persist(storage);

        return storageMapper.toResponse(storage);
    }

    @Override
    public Page<StorageResponse> getAllStorages(Long page, Long size) {
        List<Storage> storages;
        Long totalElements;
        storages = storageRepository.findAll(page, size);
        totalElements = storageRepository.countAll();

        Long totalPages = (totalElements + size - 1) / size;
        List<StorageResponse> content = storages.stream().map(storage -> {
            StorageResponse response = new StorageResponse();
            response.setId(storage.getId());
            response.setCapacity(storage.getCapacity());

            Team team = teamRepository.findById(storage.getTeamId());
            response.setTeam(teamMapper.toResponse(team));

            Address address = addressRepository.findById(storage.getAddressId());
            response.setLocation(addressMapper.toAddressResponse(address));

            return response;
        }).toList();

        Page<StorageResponse> pageResponse = new Page<>();
        pageResponse.setContent(content);
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }

    @Override
    public StorageResponse getStorage(long id) throws ApiException {
        if (!storageRepository.existsById(id)) {
            throw new NotFoundException(String.format("Storage with ID %d does not exist.", id));
        }

        Storage storage = storageRepository.findById(id);
        StorageResponse response = new StorageResponse();
        response.setId(storage.getId());
        response.setCapacity(storage.getCapacity());

        Team team = teamRepository.findById(storage.getTeamId());
        response.setTeam(teamMapper.toResponse(team));

        Address address = addressRepository.findById(storage.getAddressId());
        response.setLocation(addressMapper.toAddressResponse(address));
        return response;
    }

    @Override
    public Page<StorageResponse> getStoragesByTeamId(Long teamId, Long page, Long size) {
        List<Storage> storages = storageRepository.findByTeamId(teamId, page, size);
        Long totalElements = storageRepository.countByTeamId(teamId);
        Long totalPages = (totalElements + size - 1) / size;

        List<StorageResponse> content = storages.stream().map(storage -> {
            StorageResponse response = new StorageResponse();
            response.setId(storage.getId());
            response.setCapacity(storage.getCapacity());

            Team team = teamRepository.findById(storage.getTeamId());
            response.setTeam(teamMapper.toResponse(team));

            Address address = addressRepository.findById(storage.getAddressId());
            response.setLocation(addressMapper.toAddressResponse(address));

            return response;
        }).toList();

        Page<StorageResponse> pageResponse = new Page<>();
        pageResponse.setContent(content);
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }


}
