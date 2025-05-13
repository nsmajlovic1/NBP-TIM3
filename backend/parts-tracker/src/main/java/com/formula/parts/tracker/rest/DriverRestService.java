package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.driver.DriverService;
import com.formula.parts.tracker.shared.dto.driver.DriverCreateRequest;
import com.formula.parts.tracker.shared.dto.driver.DriverResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Driver API")
@RequestMapping("/api/driver")
@RequiredArgsConstructor
public class DriverRestService {

    private final DriverService driverService;

    @PostMapping
    public ResponseEntity<DriverResponse> create(
        @Valid @RequestBody final DriverCreateRequest request) throws ApiException {
        return ResponseEntity.ok(driverService.create(request));
    }

    @GetMapping("team")
    public ResponseEntity<List<DriverResponse>> getTeamDrivers()
        throws ApiException {
        return ResponseEntity.ok(driverService.getTeamDrivers());
    }

    @GetMapping
    public ResponseEntity<List<DriverResponse>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

}
