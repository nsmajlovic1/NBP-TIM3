package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Storage;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class StorageRepository extends BaseRepository<Storage>{

    public StorageRepository(final DataSource dataSource) {super(dataSource);}

    public Storage persist(final Storage storage) {
        final String insertQuery = """
                    INSERT INTO NBP02.STORAGE (
                        ID,
                        TEAM_ID,
                        CAPACITY,
                        ADDRESS_ID
                    ) VALUES (NBP02."ISEQ$$_276610".NEXTVAL, ?, ?, ?)
                """;

        executeInsertQuery(insertQuery, storage.getTeamId(), storage.getCapacity(), storage.getAddressId());

        final String selectQuery = "SELECT * FROM NBP02.STORAGE WHERE ROWID = (SELECT MAX(ROWID) FROM NBP02.STORAGE)";
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
}
