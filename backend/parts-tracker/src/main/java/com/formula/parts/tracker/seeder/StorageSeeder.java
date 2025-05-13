package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class StorageSeeder implements DataSeeder{

    private final JdbcTemplate jdbcTemplate;

    public StorageSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void seed() {
        int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM storage", Integer.class);
        if (count > 0) {
            return; // Already seeded
        }

        // Get team IDs in insertion order
        List<Integer> teamIds = jdbcTemplate.query(
                "SELECT id FROM team ORDER BY id ASC",
                (rs, rowNum) -> rs.getInt("id")
        );

        // Get address IDs in insertion order
        List<Integer> addressIds = jdbcTemplate.query(
                "SELECT id FROM address ORDER BY id ASC",
                (rs, rowNum) -> rs.getInt("id")
        );

        if (teamIds.size() < 10 || addressIds.size() < 20) {
            throw new IllegalStateException("Not enough teams or addresses to seed storages.");
        }

        String insert = "INSERT INTO storage (team_id, capacity, address_id) VALUES (?, ?, ?)";

        // Add 2 storages per team (1 HQ, 1 storage site)
        for (int i = 0; i < 10; i++) {
            int teamId = teamIds.get(i);
            int hqAddressId = addressIds.get(i);      // address 1–10
            int storageAddressId = addressIds.get(i + 10); // address 11–20

            jdbcTemplate.update(insert, teamId, 30, hqAddressId);
            jdbcTemplate.update(insert, teamId, 30, storageAddressId);
        }

        System.out.println("✅ Seeded 20 storage records.");
    }
}
