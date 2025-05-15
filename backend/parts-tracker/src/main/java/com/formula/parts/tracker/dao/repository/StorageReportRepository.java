package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.StorageReport;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Repository
@RequiredArgsConstructor
public class StorageReportRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final Logger logger = LoggerFactory.getLogger(StorageReportRepository.class);

    private final RowMapper<StorageReport> rowMapper = (rs, rowNum) -> {
        StorageReport report = new StorageReport();
        report.setStorageId(rs.getLong("storage_id"));
        report.setTeamId(rs.getLong("team_id"));
        report.setCapacity(rs.getInt("capacity"));
        report.setCurrentPartsCount(rs.getInt("total_parts")); // Mapping to the COUNT of parts
        report.setCityName(rs.getString("city_name"));
        report.setCountryIso(rs.getString("country_iso"));
        report.setStreetName(rs.getString("street_name"));
        report.setOccupancyPercent(rs.getDouble("occupancy_percent"));
        report.setTotalWeight(rs.getDouble("total_weight"));
        return report;
    };


    public List<StorageReport> findAll() {
        try {
            String sql = "SELECT * FROM NBP02.storage_occupancy_report";
            return jdbcTemplate.query(sql, rowMapper);
        } catch (Exception e) {
            // log the exception (use proper logging framework in real code)
            logger.error("Error fetching all storage reports", e);
            throw new RuntimeException("Error fetching all storage reports", e);
        }
    }

    public List<StorageReport> findByTeamId(Long teamId) {
        try {
            String sql = "SELECT * FROM NBP02.storage_occupancy_report WHERE team_id = ?";
            return jdbcTemplate.query(sql, rowMapper, teamId);
        } catch (Exception e) {
            // log the exception
            throw new RuntimeException("Error fetching storage reports for team: " + teamId, e);
        }
    }
}
