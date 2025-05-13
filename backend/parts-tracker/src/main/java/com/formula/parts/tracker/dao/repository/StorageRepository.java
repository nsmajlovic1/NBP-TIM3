package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class StorageRepository extends BaseRepository<Storage> {

    public StorageRepository(final DataSource dataSource) {
        super(dataSource);
    }

    public Storage persist(final Storage storage) {
        final String insertQuery = """
                INSERT INTO NBP02.STORAGE (
                    ID,
                    TEAM_ID,
                    CAPACITY,
                    ADDRESS_ID
                ) VALUES (NBP02."ISEQ$$_276610".NEXTVAL, ?, ?, ?)
            """;

        executeInsertQuery(insertQuery, storage.getTeamId(), storage.getCapacity(),
            storage.getAddressId());

        final String selectQuery = "SELECT * FROM NBP02.STORAGE ORDER BY ID DESC FETCH FIRST 1 ROWS ONLY";
        return executeSingleSelectQuery(selectQuery, this::mapToEntity);
    }

    public List<Storage> findAll(Long page, Long size) {
        final String query = """
                SELECT * FROM NBP02.STORAGE
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, offset, size);
    }

    public Long countAll() {
        final String query = """
                SELECT COUNT(*) FROM NBP02.STORAGE
            """;

        return executeCountQuery(query);
    }

    private Storage mapToEntity(final ResultSet resultSet) {
        try {
            final Storage storage = new Storage();
            storage.setId(resultSet.getLong("ID"));
            storage.setTeamId(resultSet.getLong("TEAM_ID"));
            storage.setCapacity(resultSet.getInt("CAPACITY"));
            storage.setAddressId(resultSet.getLong("ADDRESS_ID"));
            return storage;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public boolean existsById(long id) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.STORAGE WHERE ID = ?
            """;

        return executeExistsQuery(query, id);
    }

    public Storage findById(Long id) {
        final String query = "SELECT * FROM STORAGE WHERE ID = ?";
        return executeSingleSelectQuery(query, this::mapToEntity, id);
    }

    public List<Storage> findByTeamId(Long teamId, Long page, Long size) {
        final String query = """
                SELECT * FROM NBP02.STORAGE
                WHERE TEAM_ID = ?
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, teamId, offset, size);
    }

    public Optional<Storage> findByTeamIdAndAddressId(final Long teamId, final Long addressId) {
        final String query = """
                SELECT * FROM NBP02.STORAGE
                WHERE TEAM_ID = ? AND ADDRESS_ID = ?
            """;

        return Optional.ofNullable(
            executeSingleSelectQuery(query, this::mapToEntity, teamId, addressId));
    }

    public boolean existsByTeamIdAndAddressId(final Long teamId, final Long addressId) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.STORAGE
                WHERE TEAM_ID = ? AND ADDRESS_ID = ?
            """;

        return executeExistsQuery(query, teamId, addressId);
    }

    public Long countByTeamId(Long teamId) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.STORAGE
                WHERE TEAM_ID = ?
            """;

        return executeCountQuery(query, teamId);
    }

}
