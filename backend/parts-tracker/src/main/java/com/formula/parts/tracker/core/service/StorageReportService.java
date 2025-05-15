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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
            // Set page size to landscape
            Document document = new Document(PageSize.LETTER.rotate());
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, out);

            // Set PDF metadata (optional)
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyy_HHmm");
            String filename = "StorageReport_" + now.format(formatter) + ".pdf";
            document.addTitle(filename);
            document.addAuthor("Formula Parts Tracker System");
            document.addCreationDate();

            document.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);

            Paragraph title = new Paragraph("Storage Utilization Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(10f);
            document.add(title);

            // Date & Info
            Font infoFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
            String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
            Paragraph info = new Paragraph("Generated on: " + currentDateTime + "\nAuthor: System Admin\nCompany: Formula Parts Inc.", infoFont);

            info.setAlignment(Element.ALIGN_RIGHT);
            info.setSpacingAfter(20f);
            document.add(info);

            // Table
            PdfPTable table = new PdfPTable(9);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 1, 1, 1, 2, 1, 3, 1, 1});

            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Stream.of("Storage ID", "Team ID", "Capacity", "Current Parts",
                            "City", "Country", "Street", "Occupancy (%)", "Total Weight (KG)")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setPhrase(new Phrase(headerTitle, headerFont));
                        table.addCell(header);
                    });

            int rowIndex = 0;
            for (StorageReport report : reports) {
                BaseColor rowColor = (rowIndex % 2 == 0) ? BaseColor.WHITE : new BaseColor(230, 230, 230); // Light gray

                PdfPCell cell1 = new PdfPCell(new Phrase(String.valueOf(report.getStorageId())));
                cell1.setBackgroundColor(rowColor);
                table.addCell(cell1);

                PdfPCell cell2 = new PdfPCell(new Phrase(String.valueOf(report.getTeamId())));
                cell2.setBackgroundColor(rowColor);
                table.addCell(cell2);

                PdfPCell cell3 = new PdfPCell(new Phrase(String.valueOf(report.getCapacity())));
                cell3.setBackgroundColor(rowColor);
                table.addCell(cell3);

                PdfPCell cell4 = new PdfPCell(new Phrase(String.valueOf(report.getCurrentPartsCount())));
                cell4.setBackgroundColor(rowColor);
                table.addCell(cell4);

                PdfPCell cell5 = new PdfPCell(new Phrase(report.getCityName() != null ? report.getCityName() : ""));
                cell5.setBackgroundColor(rowColor);
                table.addCell(cell5);

                PdfPCell cell6 = new PdfPCell(new Phrase(report.getCountryIso() != null ? report.getCountryIso() : ""));
                cell6.setBackgroundColor(rowColor);
                table.addCell(cell6);

                PdfPCell cell7 = new PdfPCell(new Phrase(report.getStreetName() != null ? report.getStreetName() : ""));
                cell7.setBackgroundColor(rowColor);
                table.addCell(cell7);

                PdfPCell cell8 = new PdfPCell(new Phrase(report.getOccupancyPercent() != null ? String.format("%.2f", report.getOccupancyPercent()) : ""));
                cell8.setBackgroundColor(rowColor);
                table.addCell(cell8);

                PdfPCell cell9 = new PdfPCell(new Phrase(report.getTotalWeight() != null ? String.valueOf(report.getTotalWeight()) : ""));
                cell9.setBackgroundColor(rowColor);
                table.addCell(cell9);

                rowIndex++;
            }

            document.add(table);
            document.close();
            return out.toByteArray();
        } catch (DocumentException e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }





}
