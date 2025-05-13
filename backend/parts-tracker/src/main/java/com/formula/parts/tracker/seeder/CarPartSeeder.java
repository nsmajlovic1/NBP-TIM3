package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class CarPartSeeder implements DataSeeder {

    private final JdbcTemplate jdbcTemplate;

    public CarPartSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void seed() {
        int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM car_part", Integer.class);
        if (count > 0) {
            return; // Already seeded
        }

        // Get all drivers with their team IDs
        List<Map<String, Object>> drivers = jdbcTemplate.queryForList("SELECT id, team_id FROM driver");

        // Get all storages with team_id
        List<Map<String, Object>> storages = jdbcTemplate.queryForList("SELECT id, team_id FROM storage");

        // Group storages by team_id
        Map<Integer, List<Integer>> teamStorageMap = new HashMap<>();
        for (Map<String, Object> storage : storages) {
            // Safely convert BigDecimal to int
            int teamId = ((BigDecimal) storage.get("team_id")).intValue();
            int storageId = ((BigDecimal) storage.get("id")).intValue();
            teamStorageMap.computeIfAbsent(teamId, k -> new ArrayList<>()).add(storageId);
        }

        List<String> partTypes = Arrays.asList(
                "ICE Unit", "MGU-H", "MGU-K", "Front Wing", "Rear Wing", "Sidepods", "Gearbox"
        );

        String insert = """
            INSERT INTO car_part 
            (driver_id, storage_id, name, description, homologation_number, status, package_id, weight, manufactured_at) 
            VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?)
            """;

        Random rand = new Random();

        for (Map<String, Object> driver : drivers) {
            int driverId = ((BigDecimal) driver.get("id")).intValue();
            int teamId = ((BigDecimal) driver.get("team_id")).intValue();
            List<Integer> teamStorages = teamStorageMap.get(teamId);

            if (teamStorages == null || teamStorages.size() == 0) {
                System.out.println("⚠️ Skipping driver " + driverId + ": no storages for team " + teamId);
                continue;
            }

            // Assign two random parts
            Collections.shuffle(partTypes);
            List<String> driverParts = partTypes.subList(0, 2);

            for (String partName : driverParts) {
                int storageId = teamStorages.get(rand.nextInt(teamStorages.size()));
                String description = "Component: " + partName + " for driver " + driverId;
                String homologationNumber = "HOMO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
                double weight = 10 + rand.nextDouble() * 40; // between 10 and 50 kg
                LocalDateTime manufacturedAt = LocalDateTime.now().minusDays(rand.nextInt(365));

                jdbcTemplate.update(insert,
                        driverId,
                        storageId,
                        partName,
                        description,
                        homologationNumber,
                        "In Storage",
                        weight,
                        manufacturedAt
                );
            }
        }

        System.out.println("✅ Seeded car parts for drivers.");
    }
}
