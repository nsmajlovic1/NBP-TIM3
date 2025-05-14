package com.formula.parts.tracker.core.service;

import com.formula.parts.tracker.dao.model.StorageReport;
import com.formula.parts.tracker.dao.repository.StorageReportRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class StorageReportService {

    private final StorageReportRepository repository;

    public List<StorageReport> getAllReports() {
        return repository.findAll();
    }

    public List<StorageReport> getReportsByTeamId(Long teamId) {
        return repository.findByTeamId(teamId);
    }

    public byte[] generatePdfReport(List<StorageReport> reports) {
        try {
            // Set page size to landscape (Letter size)
            Document document = new Document(PageSize.LETTER.rotate());
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
            Paragraph title = new Paragraph("Storage Utilization Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20f);
            document.add(title);

            // Adjust the number of columns in the table to match the fields
            PdfPTable table = new PdfPTable(8); // 8 columns
            table.setWidthPercentage(100);

            // Adjusted column widths (small columns for IDs, larger columns for text-heavy fields)
            table.setWidths(new int[]{1, 1, 2, 2, 3, 2, 3, 3}); // Reduced size for IDs, more space for others

            // Table headers with all columns
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10); // Smaller font for headers
            Stream.of("Storage ID", "Team ID", "Capacity", "Current Parts",
                            "City", "Country", "Street", "Occupancy (%)")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setPhrase(new Phrase(headerTitle, headerFont)); // Apply header font
                        table.addCell(header);
                    });

            // Table rows with data from StorageReport
            for (StorageReport report : reports) {
                table.addCell(String.valueOf(report.getStorageId()));
                table.addCell(String.valueOf(report.getTeamId()));
                table.addCell(String.valueOf(report.getCapacity()));
                table.addCell(String.valueOf(report.getCurrentPartsCount()));
                table.addCell(report.getCityName() != null ? report.getCityName() : "");
                table.addCell(report.getCountryIso() != null ? report.getCountryIso() : "");
                table.addCell(report.getStreetName() != null ? report.getStreetName() : "");
                table.addCell(report.getOccupancyPercent() != null ? String.format("%.2f", report.getOccupancyPercent()) : "");
            }

            document.add(table);
            document.close();
            return out.toByteArray();
        } catch (DocumentException e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }




}
