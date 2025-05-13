package com.formula.parts.tracker.rest;


import com.formula.parts.tracker.core.service.pkg.PackageService;
import com.formula.parts.tracker.shared.dto.pkg.PackageCreateRequest;
import com.formula.parts.tracker.shared.dto.pkg.PackageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Package API")
@RequestMapping("/api/package")
@RequiredArgsConstructor
public class PackageRestService {

    private final PackageService packageService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PackageResponse> create(
        @Valid @RequestBody final PackageCreateRequest request) throws ApiException {
        return ResponseEntity.ok(packageService.create(request));
    }


}
