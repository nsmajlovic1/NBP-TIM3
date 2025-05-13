package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
public class ShipmentSeeder implements DataSeeder {

    private final JdbcTemplate jdbcTemplate;

    public ShipmentSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void seed() {
        String checkQuery = "SELECT COUNT(*) FROM shipment";
        int count = jdbcTemplate.queryForObject(checkQuery, Integer.class);

        if (count == 0) {
            String insertQuery = "INSERT INTO shipment (transport_id, status) VALUES (?, ?)";

            List<Map<String, Object>> transports = jdbcTemplate.queryForList("SELECT id FROM transport");

            if (transports.isEmpty()) {
                System.out.println("No transports found, skipping shipment seeding.");
                return;
            }

            String[] statuses = {"Pending", "In Transit", "Delivered", "Delayed", "Cancelled"};
            Random random = new Random();

            for (Map<String, Object> transport : transports) {
                int transportId = ((BigDecimal) transport.get("id")).intValue();
                String status = statuses[random.nextInt(statuses.length)];

                jdbcTemplate.update(insertQuery, transportId, status);
            }

            System.out.println("✅ Seeded " + transports.size() + " shipments.");
        }
    }
}
