package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.core.service.address.AddressService;
import com.formula.parts.tracker.core.service.storage.StorageService;
import com.formula.parts.tracker.shared.dto.Page;
import com.formula.parts.tracker.shared.dto.address.AddressRequest;
import com.formula.parts.tracker.shared.dto.address.AddressResponse;
import com.formula.parts.tracker.shared.dto.storage.StorageRequest;
import com.formula.parts.tracker.shared.dto.storage.StorageResponse;
import com.formula.parts.tracker.shared.exception.ApiException;
import com.formula.parts.tracker.shared.success.ApiSuccessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
public class StorageRestService {
    private final StorageService storageService;

    @PostMapping("create")
    public ResponseEntity<StorageResponse> createStorage(@Valid @RequestBody StorageRequest request)
            throws ApiException {
        return ResponseEntity.ok(storageService.create(request));
    }

    @GetMapping("all")
    public ResponseEntity<Page<StorageResponse>> getAllStorages(
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size){
        return ResponseEntity.ok(storageService.getAllStorages(page, size));
    }

    @GetMapping("{id}")
    public ResponseEntity<StorageResponse> getStorage(@PathVariable long id) throws ApiException {
        return ResponseEntity.ok(storageService.getStorage(id));
    }

    @GetMapping("team")
    public ResponseEntity<Page<StorageResponse>> getStoragesByTeamId(
            @RequestParam("teamId") Long teamId,
            @RequestParam(value = "page", defaultValue = "1") Long page,
            @RequestParam(value = "size", defaultValue = "10") Long size) {
        return ResponseEntity.ok(storageService.getStoragesByTeamId(teamId, page, size));
    }

}
