package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.transportcompany.TransportCompanyService;
import com.formula.parts.tracker.shared.dto.Page;
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

import java.util.List;

@RestController
@Tag(name = "Transport Company API")
@RequestMapping("/api/transport-company")
@RequiredArgsConstructor
public class TransportCompanyRestService {

    private final TransportCompanyService transportCompanyService;

    @PostMapping("create")
    public ResponseEntity<TransportCompanyResponse> createTransportCompany(
            @Valid @RequestBody final TransportCompanyRequest request) throws ApiException {
        return ResponseEntity.ok(transportCompanyService.create(request));
    }

    @GetMapping("all")
    public ResponseEntity<Page<TransportCompanyResponse>> getAllCompanies(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size){
        return ResponseEntity.ok(transportCompanyService.getAllCompanies(search, page, size));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiSuccessResponse> deleteCompany(@PathVariable long id) throws ApiException {
        transportCompanyService.deleteCompany(id);
        ApiSuccessResponse successResponse = new ApiSuccessResponse(HttpStatus.OK, "Company with ID " + id + " has been successfully deleted.");
        return ResponseEntity.ok(successResponse);
    }

}
