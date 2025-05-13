package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class TeamSeeder implements DataSeeder{

    private final JdbcTemplate jdbcTemplate;

    public TeamSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void seed() {
        String checkAddressQuery = "SELECT COUNT(*) FROM team";
        int count = jdbcTemplate.queryForObject(checkAddressQuery, Integer.class);

        if (count > 0) {
            return; // Already seeded
        }
            String insertQuery = "INSERT INTO team (name, description, country_iso) VALUES (?, ?, ?)";

            jdbcTemplate.update(insertQuery, "Mercedes-AMG Petronas", "Based in Brackley, UK. One of the top teams in F1.", "DE");
            jdbcTemplate.update(insertQuery, "Red Bull Racing", "Headquartered in Milton Keynes, UK. Backed by Red Bull.", "AT");
            jdbcTemplate.update(insertQuery, "Ferrari", "Scuderia Ferrari, the oldest team, based in Maranello.", "IT");
            jdbcTemplate.update(insertQuery, "McLaren", "British team known for innovation and heritage.", "GB");
            jdbcTemplate.update(insertQuery, "Aston Martin", "Team based in Silverstone, with growing potential.", "GB");
            jdbcTemplate.update(insertQuery, "Alpine", "French team, formerly known as Renault F1.", "FR");
            jdbcTemplate.update(insertQuery, "Williams", "Historic British team founded by Frank Williams.", "GB");
            jdbcTemplate.update(insertQuery, "Racing Bulls", "Red Bull’s sister team, based in Faenza.", "IT");
            jdbcTemplate.update(insertQuery, "Kick Sauber", "Swiss team previously known as Alfa Romeo.", "CH");
            jdbcTemplate.update(insertQuery, "Haas", "American team with Ferrari engine partnership.", "US");

        System.out.println("✅ Seeded 10 team records.");
    }
}