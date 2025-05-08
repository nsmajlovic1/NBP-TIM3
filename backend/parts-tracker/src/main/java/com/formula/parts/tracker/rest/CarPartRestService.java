package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.carpart.CarPartService;
import com.formula.parts.tracker.core.service.transportcompany.TransportCompanyService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.success.ApiSuccessResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Transport Company API")
@RequestMapping("/api/car-part")
@RequiredArgsConstructor
public class CarPartRestService {
    private final CarPartService carPartService;

    @PostMapping("create")
    public ResponseEntity<ApiSuccessResponse> createCarPart(
            @Valid @RequestBody final CarPartRequest request) throws ApiException {
        carPartService.createCarPart(request);
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK, "Car part successfully created.");
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<CarPartResponse> getCarPart(@PathVariable long id) throws ApiException {
        return ResponseEntity.ok(carPartService.getCarPart(id));
    }
}
