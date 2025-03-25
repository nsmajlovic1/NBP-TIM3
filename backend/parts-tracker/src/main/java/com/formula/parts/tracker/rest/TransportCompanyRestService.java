package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.transportcompany.TransportCompanyService;
import com.formula.parts.tracker.dto.Page;
import com.formula.parts.tracker.dto.TransportCompanyResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Transport Company API")
@RequestMapping("/api/transport-company")
@RequiredArgsConstructor
public class TransportCompanyRestService {

    private final TransportCompanyService transportCompanyService;

    @GetMapping("/api/transport-company")
    public ResponseEntity<Page<TransportCompanyResponse>> getTransportCompanyInfo() {
        return ResponseEntity.ok(transportCompanyService.get());
    }

}
