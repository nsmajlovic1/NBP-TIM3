package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.CarPart;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class CarPartRepository extends BaseRepository<CarPart> {

    public CarPartRepository(final DataSource dataSource) {
        super(dataSource);
    }

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

        executeInsertQuery(insertQuery, carPart.getDriverId(), carPart.getStorageId(),
            carPart.getName(), carPart.getDescription(), carPart.getHomologationNumber(),
            carPart.getStatus(), carPart.getPackageId(), carPart.getWeight(),
            carPart.getManufacturedAt());

    }

    public List<CarPart> findAll(final Long page, final Long size, final Long teamId) {
        final String query = """
                SELECT cp.* FROM NBP02.CAR_PART cp
                JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                JOIN NBP02.TEAM t ON d.TEAM_ID = t.ID
                WHERE t.ID = ?
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, teamId, offset, size);
    }

    public List<CarPart> findByNameLike(final String keyword, final Long page, final Long size,
        final Long teamId) {
        final String query = """
                SELECT cp.* FROM NBP02.CAR_PART cp
                JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                JOIN NBP02.TEAM t ON d.TEAM_ID = t.ID
                WHERE LOWER(cp.NAME) LIKE ? AND t.ID = ?
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        final String pattern = "%" + keyword.toLowerCase() + "%";

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, pattern, teamId, offset, size);
    }

    public Long countByNameLike(final String keyword, final Long teamId) {
        final String query = """
                SELECT COUNT(cp.ID) FROM NBP02.CAR_PART cp
                JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                JOIN NBP02.TEAM t ON d.TEAM_ID = t.ID
                WHERE LOWER(cp.NAME) LIKE ? AND t.ID = ?
            """;

        final String pattern = "%" + keyword.toLowerCase() + "%";

        return executeCountQuery(query, pattern, teamId);
    }

    public Long countAll(final Long teamId) {
        final String query = """
                SELECT COUNT(cp.ID) FROM NBP02.CAR_PART cp
                JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                JOIN NBP02.TEAM t ON d.TEAM_ID = t.ID
                WHERE t.ID = ?
            """;

        return executeCountQuery(query, teamId);
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
