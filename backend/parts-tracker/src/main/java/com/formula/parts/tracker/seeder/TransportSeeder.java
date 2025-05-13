package com.formula.parts.tracker.seeder;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
public class TransportSeeder implements DataSeeder {

    private final JdbcTemplate jdbcTemplate;
    private final Random random = new Random();

    public TransportSeeder(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void seed() {
        String checkQuery = "SELECT COUNT(*) FROM transport";
        int count = jdbcTemplate.queryForObject(checkQuery, Integer.class);

        if (count > 0) return;

        List<Map<String, Object>> companies = jdbcTemplate.queryForList("SELECT id FROM transport_company");
        List<Map<String, Object>> addresses = jdbcTemplate.queryForList("SELECT id FROM address");

        if (companies.size() == 0 || addresses.size() < 2) return;

        String insertQuery = """
            INSERT INTO transport 
            (type, company_id, vehicle_number, departure_address_id, departure_date, actual_arrival_date, expected_arrival_date, destination_address_id, capacity, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        String[] types = {"Air", "Ground", "Sea"};
        String[] statuses = {"Scheduled", "In Transit", "Delayed", "Arrived"};

        for (int i = 0; i < 10; i++) {
            BigDecimal companyIdDecimal = (BigDecimal) companies.get(random.nextInt(companies.size())).get("id");
            int companyId = companyIdDecimal.intValue();

            int depIdx = random.nextInt(addresses.size());
            int destIdx;
            do {
                destIdx = random.nextInt(addresses.size());
            } while (destIdx == depIdx);

            BigDecimal depAddressDecimal = (BigDecimal) addresses.get(depIdx).get("id");
            BigDecimal destAddressDecimal = (BigDecimal) addresses.get(destIdx).get("id");

            int depAddressId = depAddressDecimal.intValue();
            int destAddressId = destAddressDecimal.intValue();

            LocalDate departure = LocalDate.now().minusDays(random.nextInt(5));
            LocalDate expected = departure.plusDays(2 + random.nextInt(5));
            LocalDate actual = expected.minusDays(random.nextInt(2));

            jdbcTemplate.update(
                    insertQuery,
                    types[random.nextInt(types.length)],
                    companyId,
                    (1000 + random.nextInt(9000)),
                    depAddressId,
                    Date.valueOf(departure),
                    Date.valueOf(actual),
                    Date.valueOf(expected),
                    destAddressId,
                    1000 + random.nextInt(4000), // capacity
                    statuses[random.nextInt(statuses.length)]
            );
        }
        System.out.println("✅ Seeded 10 transport records.");
    }
}
