package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.transport.TransportService;
import com.formula.parts.tracker.shared.dto.statistic.StatisticResponse;
import com.formula.parts.tracker.shared.dto.transport.TransportCreateRequest;
import com.formula.parts.tracker.shared.dto.transport.TransportResponse;
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
@Tag(name = "Transport API")
@RequestMapping("/api/transport")
@RequiredArgsConstructor
public class TransportRestService {

    private final TransportService transportService;

    @PostMapping
    public ResponseEntity<TransportResponse> create(
        @Valid @RequestBody final TransportCreateRequest request) throws ApiException {
        return ResponseEntity.ok(transportService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<TransportResponse>> get() throws ApiException {
        return ResponseEntity.ok(transportService.getAll());
    }

    @GetMapping("statistic")
    public ResponseEntity<List<StatisticResponse>> getStatistic() throws ApiException {
        return ResponseEntity.ok(transportService.countByStatus());
    }

}
