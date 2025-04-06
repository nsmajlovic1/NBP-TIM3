package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.transportcompany.TransportCompanyService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyRequest;
import com.formula.parts.tracker.shared.dto.transportcompany.TransportCompanyResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Transport Company API")
@RequestMapping("/api/transport-company")
@RequiredArgsConstructor
public class TransportCompanyRestService {

    private final TransportCompanyService transportCompanyService;

    @GetMapping
    public ResponseEntity<Page<TransportCompanyResponse>> getTransportCompanyInfo() {
        return ResponseEntity.ok(transportCompanyService.get());
    }


    @PostMapping("/create")
    public ResponseEntity<TransportCompanyResponse> createTransportCompany(
            @Valid @RequestBody final TransportCompanyRequest request) {
        return ResponseEntity.ok(transportCompanyService.create(request));
    }

}
