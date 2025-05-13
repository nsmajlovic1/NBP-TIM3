package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class TransportCompanySeeder implements DataSeeder {

    private final JdbcTemplate jdbcTemplate;

    public TransportCompanySeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void seed() {
        String checkQuery = "SELECT COUNT(*) FROM transport_company";
        int count = jdbcTemplate.queryForObject(checkQuery, Integer.class);

        if (count > 0) {
            return; // Already seeded
        }
            String insertQuery = "INSERT INTO transport_company (name, description) VALUES (?, ?)";

            jdbcTemplate.update(insertQuery, "DHL Motorsport", "Official logistics partner for Formula 1, handling trackside freight and transport.");
            jdbcTemplate.update(insertQuery, "DB Schenker", "Global logistics company supporting race team operations and spare parts delivery.");
            jdbcTemplate.update(insertQuery, "Kuehne+Nagel", "Specializes in precision and temperature-sensitive equipment for motorsports.");
            jdbcTemplate.update(insertQuery, "FedEx Racing Logistics", "Ensures timely global transport of race-critical car components.");
            jdbcTemplate.update(insertQuery, "UPS Performance Transport", "Offers rapid ground and air shipping of F1 parts and gear.");
        System.out.println("✅ Seeded 5 transport company records.");
    }
}
