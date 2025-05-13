package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Driver;
import com.formula.parts.tracker.dao.model.DriverFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class DriverRepository extends BaseRepository<Driver> {

    public DriverRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Driver mapToEntity(final ResultSet resultSet) {
        try {
            final Driver driver = new Driver();

            driver.setId(resultSet.getLong(DriverFields.ID));
            driver.setFirstName(resultSet.getString(DriverFields.FIRST_NAME));
            driver.setLastName(resultSet.getString(DriverFields.LAST_NAME));
            driver.setCountryIso(resultSet.getString(DriverFields.COUNTRY_ISO));
            driver.setCarNumber(resultSet.getLong(DriverFields.CAR_NUMBER));
            driver.setTeamId(resultSet.getLong(DriverFields.TEAM_ID));

            return driver;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }


    public Driver persist(final Driver driver) {
        final String insertQuery = """
                INSERT INTO NBP02.DRIVER (
                    ID,
                    FIRST_NAME,
                    LAST_NAME,
                    COUNTRY_ISO,
                    CAR_NUMBER,
                    TEAM_ID
                ) VALUES (NBP02.DRIVER_ID_SEQ.NEXTVAL, ?, ?, ?, ?, ?)
            """;

        executeInsertQuery(
            insertQuery,
            driver.getFirstName(),
            driver.getLastName(),
            driver.getCountryIso(),
            driver.getCarNumber(),
            driver.getTeamId()
        );

        final String selectQuery = """
                SELECT *
                FROM NBP02.DRIVER
                ORDER BY ID DESC FETCH FIRST 1 ROWS ONLY
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity);
    }

    public List<Driver> findByTeamId(final Long teamId) {
        final String query = """
                SELECT *
                FROM NBP02.DRIVER
                WHERE TEAM_ID = ?
            """;

        return executeListSelectQuery(query, this::mapToEntity, teamId);
    }

    public Optional<Driver> findById(final Long id) {
        final String query = """
                SELECT *
                FROM NBP02.DRIVER
                WHERE ID = ?
                FETCH FIRST 1 ROWS ONLY
            """;

        return Optional.ofNullable(executeSingleSelectQuery(query, this::mapToEntity, id));
    }

    public List<Driver> findAll() {
        final String query = """
                SELECT *
                FROM NBP02.DRIVER
                ORDER BY ID DESC
            """;

        return executeListSelectQuery(query, this::mapToEntity);
    }

}
