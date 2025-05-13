    package com.formula.parts.tracker.seeder;

    import org.springframework.jdbc.core.JdbcTemplate;
    import org.springframework.stereotype.Component;

    @Component
    public class AddressSeeder implements DataSeeder {

        private final JdbcTemplate jdbcTemplate;

        public AddressSeeder(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public void seed() {
            String checkAddressQuery = "SELECT COUNT(*) FROM address";
            int count = jdbcTemplate.queryForObject(checkAddressQuery, Integer.class);

            if (count == 0) {
                String insertAddressQuery = "INSERT INTO address (street_name, city_name, country_iso, longitude, latitude) VALUES (?, ?, ?, ?, ?)";

                // 10 F1 Teams - example addresses
                jdbcTemplate.update(insertAddressQuery, "Mercedesstraße 1", "Stuttgart", "DE", 9.2295, 48.7758);
                jdbcTemplate.update(insertAddressQuery, "Red Bull Ring", "Spielberg", "AT", 14.7655, 47.2197);
                jdbcTemplate.update(insertAddressQuery, "Via Abetone Inferiore 4", "Maranello", "IT", 10.8642, 44.5321);
                jdbcTemplate.update(insertAddressQuery, "McLaren Technology Centre", "Woking", "UK", -0.5556, 51.3446);
                jdbcTemplate.update(insertAddressQuery, "Grove", "Oxfordshire", "UK", -1.412, 51.607);
                jdbcTemplate.update(insertAddressQuery, "Enstone", "Oxfordshire", "UK", -1.422, 51.925);
                jdbcTemplate.update(insertAddressQuery, "Hinwil", "Zurich", "CH", 8.8432, 47.3024);
                jdbcTemplate.update(insertAddressQuery, "Faenza", "Emilia-Romagna", "IT", 11.877, 44.291);
                jdbcTemplate.update(insertAddressQuery, "Silverstone Park", "Northamptonshire", "UK", -1.0175, 52.072);
                jdbcTemplate.update(insertAddressQuery, "Banbury", "Oxfordshire", "UK", -1.340, 52.060);

                // 10 storage locations
                jdbcTemplate.update(insertAddressQuery, "Storage 1", "Stuttgart", "DE", 9.23, 48.77);
                jdbcTemplate.update(insertAddressQuery, "Storage 2", "Spielberg", "AT", 14.76, 47.21);
                jdbcTemplate.update(insertAddressQuery, "Storage 3", "Maranello", "IT", 10.86, 44.53);
                jdbcTemplate.update(insertAddressQuery, "Storage 4", "Woking", "UK", -0.55, 51.34);
                jdbcTemplate.update(insertAddressQuery, "Storage 5", "Grove", "UK", -1.41, 51.60);
                jdbcTemplate.update(insertAddressQuery, "Storage 6", "Enstone", "UK", -1.42, 51.92);
                jdbcTemplate.update(insertAddressQuery, "Storage 7", "Hinwil", "CH", 8.84, 47.30);
                jdbcTemplate.update(insertAddressQuery, "Storage 8", "Faenza", "IT", 11.87, 44.29);
                jdbcTemplate.update(insertAddressQuery, "Storage 9", "Silverstone", "UK", -1.01, 52.07);
                jdbcTemplate.update(insertAddressQuery, "Storage 10", "Banbury", "UK", -1.34, 52.06);
            }
        }
    }