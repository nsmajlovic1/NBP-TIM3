package com.formula.parts.tracker.rest;

import com.formula.parts.tracker.dao.model.StorageReport;
import com.formula.parts.tracker.core.service.StorageReportService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.time.LocalDateTime;
@RestController
@Tag(name = "Report API")
@RequestMapping("/api/reports/storage")
@RequiredArgsConstructor
public class StorageReportRestService {

    private final StorageReportService service;

    @GetMapping
    public ResponseEntity<List<StorageReport>> getAllReports(
            @RequestParam(required = false) Long teamId
    ) {
        List<StorageReport> reports = (teamId != null)
                ? service.getReportsByTeamId(teamId)
                : service.getAllReports();

        return ResponseEntity.ok(reports);
    }

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadPdfReport(@RequestParam(required = false) Long teamId) {
        List<StorageReport> reports = (teamId != null)
                ? service.getReportsByTeamId(teamId)
                : service.getAllReports();

        byte[] pdfBytes = service.generatePdfReport(reports);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy_HHmm");
        String filename = "StorageReport_" + now.format(formatter) + ".pdf";
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + filename)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
