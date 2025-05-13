package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Component
public class PackageSeeder implements DataSeeder {

    private final JdbcTemplate jdbcTemplate;

    public PackageSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void seed() {
        String checkQuery = "SELECT COUNT(*) FROM package";
        int count = jdbcTemplate.queryForObject(checkQuery, Integer.class);

        if (count == 0) {
            List<Map<String, Object>> shipments = jdbcTemplate.queryForList("SELECT id FROM shipment");
            List<Map<String, Object>> storages = jdbcTemplate.queryForList("SELECT id FROM storage");

            if (shipments.isEmpty() || storages.size() < 2) {
                System.out.println("Not enough data to seed packages.");
                return;
            }

            String insertQuery = "INSERT INTO package (shipment_id, code, status, departure_storage_id, destination_storage_id) VALUES (?, ?, ?, ?, ?)";
            String[] statuses = {"Ready", "In Transit", "Delivered", "Damaged"};
            Random random = new Random();

            for (Map<String, Object> shipment : shipments) {
                int shipmentId = ((BigDecimal) shipment.get("id")).intValue();

                int depIdx = random.nextInt(storages.size());
                int destIdx;
                do {
                    destIdx = random.nextInt(storages.size());
                } while (destIdx == depIdx);

                int departureStorageId = ((BigDecimal) storages.get(depIdx).get("id")).intValue();
                int destinationStorageId = ((BigDecimal) storages.get(destIdx).get("id")).intValue();

                String code = "PK" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();

                String status = statuses[random.nextInt(statuses.length)];

                jdbcTemplate.update(insertQuery, shipmentId, code, status, departureStorageId, destinationStorageId);
            }

            System.out.println("✅ Seeded " + shipments.size() + " packages.");
        }
    }
}
