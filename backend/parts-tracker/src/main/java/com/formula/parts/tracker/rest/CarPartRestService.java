package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.carpart.CarPartService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.carpart.CarPartRequest;
import com.formula.parts.tracker.shared.dto.carpart.CarPartResponse;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.success.ApiSuccessResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK,
            "Car part successfully created.");
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<CarPartResponse> getCarPart(@PathVariable long id) throws ApiException {
        return ResponseEntity.ok(carPartService.getCarPart(id));
    }

    @GetMapping
    public ResponseEntity<Page<CarPartResponse>> getAllCarParts(
        @RequestParam(value = "search", required = false) String search,
        @RequestParam(value = "page", defaultValue = "1") Long page,
        @RequestParam(value = "size", defaultValue = "10000") Long size) throws ApiException {
        return ResponseEntity.ok(carPartService.getAll(search, page, size));
    }

    @GetMapping("statistic")
    public ResponseEntity<List<StatisticResponse>> getStatistic() throws ApiException {
        return ResponseEntity.ok(carPartService.countByStatus());
    }

}
