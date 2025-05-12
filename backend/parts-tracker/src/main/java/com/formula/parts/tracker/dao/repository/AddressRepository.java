package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class AddressRepository extends BaseRepository<Address> {

    public AddressRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Address mapToEntity(final ResultSet resultSet) {
        try {
            final Address address = new Address();
            address.setId(resultSet.getLong("ID"));
            address.setStreetName(resultSet.getString("STREET_NAME"));
            address.setCityName(resultSet.getString("CITY_NAME"));
            address.setCountryIso(resultSet.getString("COUNTRY_ISO"));
            address.setLongitude(resultSet.getDouble("LONGITUDE"));
            address.setLatitude(resultSet.getDouble("LATITUDE"));
            return address;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public boolean existsByName(final String street_name) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.ADDRESS WHERE STREET_NAME = ?
            """;
        return executeExistsQuery(query, street_name);
    }

    public boolean existsById(final Long id) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.ADDRESS WHERE ID = ?
            """;
        return executeExistsQuery(query, id);
    }

    public Address persist(final Address address) {
        final String insertQuery = """
                INSERT INTO NBP02.ADDRESS (
                    ID,
                    STREET_NAME,
                    CITY_NAME,
                    COUNTRY_ISO,
                    LONGITUDE,
                    LATITUDE
                ) VALUES (NBP02."ISEQ$$_276597".NEXTVAL, ?, ?, ?, ?, ?)
            """;

        executeInsertQuery(insertQuery,
            address.getStreetName(),
            address.getCityName(),
            address.getCountryIso(),
            address.getLongitude(),
            address.getLatitude());

        final String selectQuery = """
                SELECT * FROM NBP02.ADDRESS WHERE STREET_NAME = ?
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity, address.getStreetName());
    }

    public List<Address> findAll(Long page, Long size) {
        final String query = """
                SELECT * FROM NBP02.ADDRESS
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, offset, size);
    }

    public List<Address> findByNameLike(final String keyword, Long page, Long size) {
        final String query = """
                SELECT * FROM NBP02.ADDRESS
                WHERE LOWER(STREET_NAME) LIKE ?
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        // Using LOWER for case-sensitive cases
        String pattern = "%" + keyword.toLowerCase() + "%";

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, pattern, offset, size);
    }

    public Long countAll() {
        final String query = """
                SELECT COUNT(*) FROM NBP02.ADDRESS
            """;

        return executeCountQuery(query);
    }

    public Long countByNameLike(final String keyword) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.ADDRESS
                WHERE LOWER(STREET_NAME) LIKE ?
            """;

        String pattern = "%" + keyword.toLowerCase() + "%";

        return executeCountQuery(query, pattern);
    }

    public Address findById(Long id) {
        final String query = "SELECT * FROM NBP02.ADDRESS WHERE ID = ?";
        return executeSingleSelectQuery(query, this::mapToEntity, id);
    }
}
