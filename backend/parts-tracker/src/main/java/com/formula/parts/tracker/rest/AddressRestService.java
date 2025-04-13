package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.address.AddressService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressRestService {
    private final AddressService addressService;

    @PostMapping("create")
    public ResponseEntity<AddressResponse> createAddress(@Valid @RequestBody AddressRequest request)
            throws ApiException {
        return ResponseEntity.ok(addressService.create(request));
    }

    @GetMapping("all")
    public ResponseEntity<Page<AddressResponse>> getAllAddresses(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size){
        return ResponseEntity.ok(addressService.getAllAddresses(search, page, size));
    }
}
