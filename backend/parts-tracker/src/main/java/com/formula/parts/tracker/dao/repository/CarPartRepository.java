package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Repository
public class CarPartRepository extends BaseRepository<CarPart>{
    public CarPartRepository(final DataSource dataSource) {super(dataSource);}

    public void persist(final CarPart carPart) {
        final String insertQuery = """
                    INSERT INTO NBP02.CAR_PART (
                        ID,
                        DRIVER_ID,
                        STORAGE_ID,
                        NAME,
                        DESCRIPTION,
                        HOMOLOGATION_NUMBER,
                        STATUS,
                        PACKAGE_ID,
                        WEIGHT,
                        MANUFACTURED_AT
                    ) VALUES (NBP02."ISEQ$$_276628".NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        executeInsertQuery(insertQuery, carPart.getDriverId(), carPart.getStorageId(), carPart.getName(), carPart.getDescription(), carPart.getHomologationNumber(), carPart.getStatus(), carPart.getPackageId(), carPart.getWeight(), carPart.getManufacturedAt());

    }

    public List<CarPart> findAll(Long page, Long size) {
        final String query = """
            SELECT * FROM NBP02.CAR_PART
            OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
        """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, offset, size);
    }

    public Long countAll() {
        final String query = """
            SELECT COUNT(*) FROM NBP02.CAR_PART
        """;

        return executeCountQuery(query);
    }

    private CarPart mapToEntity(final ResultSet resultSet) {
        try {
            final CarPart carPart = new CarPart();
            carPart.setId(resultSet.getLong("ID"));
            carPart.setDriverId(resultSet.getLong("DRIVER_ID"));
            carPart.setStorageId(resultSet.getLong("STORAGE_ID"));
            carPart.setName(resultSet.getString("NAME"));
            carPart.setDescription(resultSet.getString("DESCRIPTION"));
            carPart.setHomologationNumber(resultSet.getString("HOMOLOGATION_NUMBER"));
            carPart.setStatus(resultSet.getString("STATUS"));
            carPart.setPackageId(resultSet.getLong("PACKAGE_ID"));
            carPart.setWeight(resultSet.getInt("WEIGHT"));
            carPart.setManufacturedAt(resultSet.getTimestamp("MANUFACTURED_AT").toLocalDateTime());
            return carPart;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public boolean existsById(long id) {
        final String query = """
            SELECT COUNT(*) FROM NBP02.CAR_PART WHERE ID = ?
        """;

        return executeExistsQuery(query, id);
    }

    public CarPart findById(Long id) {
        final String query = "SELECT * FROM NBP02.CAR_PART WHERE ID = ?";
        return executeSingleSelectQuery(query, this::mapToEntity, id);
    }
}
