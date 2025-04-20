package com.formula.parts.tracker.core.service.address;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.formula.parts.tracker.core.mapper.AddressMapper;
import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.dao.repository.AddressRepository;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.function.Predicate;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    private static final String STREET_NAME = "streetName";

    @Override
    public AddressResponse create(final AddressRequest request) throws ApiException {
        validateUniqueFieldConstraint(addressRepository::existsByName,
                request.getStreetName(), STREET_NAME);
        Address address = addressMapper.toEntity(request);

        fetchCoordinatesFromOSM(address);

        address = addressRepository.persist(address);
        return addressMapper.toAddressResponse(address);
    }

    @Override
    public Page<AddressResponse> getAllAddresses(String search, Long page, Long size) {
        List<Address> addresses;
        Long totalElements;

        if (search != null && !search.trim().isEmpty()) {
            addresses = addressRepository.findByNameLike(search, page, size);
            totalElements = addressRepository.countByNameLike(search);
        } else {
            addresses = addressRepository.findAll(page, size);
            totalElements = addressRepository.countAll();
        }

        Long totalPages = (totalElements + size - 1) / size;

        Page<AddressResponse> pageResponse = new Page<>();
        pageResponse.setContent(addresses.stream()
                .map(addressMapper::toAddressResponse)
                .toList());
        pageResponse.setPageNumber(page);
        pageResponse.setPageSize(size);
        pageResponse.setTotalElements(totalElements);
        pageResponse.setTotalPages(totalPages);

        return pageResponse;
    }

    private void fetchCoordinatesFromOSM(Address address) {
        String baseUrl = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=";
        String query = address.getStreetName() + ", " + address.getCityName();
        String url = baseUrl + URLEncoder.encode(query, StandardCharsets.UTF_8);

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("User-Agent", "JavaApp") // Required by OSM
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.body());

            if (root.isArray() && root.size() > 0) {
                JsonNode location = root.get(0);
                address.setLatitude(location.has("lat") ? location.get("lat").asDouble() : null);
                address.setLongitude(location.has("lon") ? location.get("lon").asDouble() : null);
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch coordinates from OpenStreetMap: " + e.getMessage());
        }
    }

    private <T> void validateUniqueFieldConstraint(final Predicate<T> existsByField,
                                                   final T fieldValue, final String fieldName) throws BadRequestException {
        if (Boolean.TRUE.equals(existsByField.test(fieldValue))) {
            throw new BadRequestException(
                    String.format("Provided %s is already taken.", fieldName));
        }
    }
}
