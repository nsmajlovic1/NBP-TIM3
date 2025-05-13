package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DriverSeeder implements DataSeeder{

    private final JdbcTemplate jdbcTemplate;

    public DriverSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void seed() {
        String checkAddressQuery = "SELECT COUNT(*) FROM driver";
        int count = jdbcTemplate.queryForObject(checkAddressQuery, Integer.class);

        if (count > 0) {
            return; // Already seeded
        }
            List<Map<String, Object>> teamRows;
            Map<String, Integer> teamIds = new HashMap<>();
            String getIdsQuery = "SELECT id, name FROM team";
            teamRows = jdbcTemplate.queryForList(getIdsQuery);


            for (Map<String, Object> row : teamRows) {
                teamIds.put((String) row.get("name"), ((Number) row.get("id")).intValue());
            }

            String insertQuery = "INSERT INTO driver (team_id, first_name, last_name, country_iso, car_number) VALUES (?, ?, ?, ?, ?)";

            jdbcTemplate.update(insertQuery, teamIds.get("Red Bull Racing"), "Max", "Verstappen", "NL", 1);
            jdbcTemplate.update(insertQuery, teamIds.get("Red Bull Racing"), "Liam", "Lawson", "NZ", 30);

            jdbcTemplate.update(insertQuery, teamIds.get("Ferrari"), "Charles", "Leclerc", "MC", 16);
            jdbcTemplate.update(insertQuery, teamIds.get("Ferrari"), "Lewis", "Hamilton", "GB", 44);

            jdbcTemplate.update(insertQuery, teamIds.get("McLaren"), "Lando", "Norris", "GB", 4);
            jdbcTemplate.update(insertQuery, teamIds.get("McLaren"), "Oscar", "Piastri", "AU", 81);

            jdbcTemplate.update(insertQuery, teamIds.get("Mercedes-AMG Petronas"), "George", "Russell", "GB", 63);
            jdbcTemplate.update(insertQuery, teamIds.get("Mercedes-AMG Petronas"), "Andrea Kimi", "Antonelli", "IT", 12);

            jdbcTemplate.update(insertQuery, teamIds.get("Aston Martin"), "Fernando", "Alonso", "ES", 14);
            jdbcTemplate.update(insertQuery, teamIds.get("Aston Martin"), "Lance", "Stroll", "CA", 18);

            jdbcTemplate.update(insertQuery, teamIds.get("Racing Bulls"), "Yuki", "Tsunoda", "JP", 22);
            jdbcTemplate.update(insertQuery, teamIds.get("Racing Bulls"), "Isack", "Hadjar", "FR", 6);

            jdbcTemplate.update(insertQuery, teamIds.get("Haas"), "Oliver", "Bearman", "GB", 87);
            jdbcTemplate.update(insertQuery, teamIds.get("Haas"), "Esteban", "Ocon", "FR", 31);

            jdbcTemplate.update(insertQuery, teamIds.get("Alpine"), "Pierre", "Gasly", "FR", 10);
            jdbcTemplate.update(insertQuery, teamIds.get("Alpine"), "Franco", "Colapinto", "AR", 27);

            jdbcTemplate.update(insertQuery, teamIds.get("Williams"), "Alex", "Albon", "TH", 23);
            jdbcTemplate.update(insertQuery, teamIds.get("Williams"), "Carlos", "Sainz", "ES", 55);

            jdbcTemplate.update(insertQuery, teamIds.get("Kick Sauber"), "Nico", "Hülkenberg", "DE", 27);
            jdbcTemplate.update(insertQuery, teamIds.get("Kick Sauber"), "Gabriel", "Bortoleto", "BR", 5);
            System.out.println("✅ Seeded 20 driver records.");

    }
}