package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Package;
import com.formula.parts.tracker.dao.model.PackageFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class PackageRepository extends BaseRepository<Package> {

    public PackageRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Package mapToEntity(final ResultSet resultSet) {
        try {
            final Package pkg = new Package();

            pkg.setId(resultSet.getLong(PackageFields.ID));
            pkg.setCode(resultSet.getString(PackageFields.CODE));
            pkg.setStatus(resultSet.getString(PackageFields.STATUS));
            pkg.setShipmentId(resultSet.getLong(PackageFields.SHIPMENT_ID));
            pkg.setDepartureStorageId(resultSet.getLong(PackageFields.DEPARTURE_STORAGE_ID));
            pkg.setDestinationStorageId(resultSet.getLong(PackageFields.DESTINATION_STORAGE_ID));

            return pkg;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public Package persist(final Package pkg) {
        final String insertQuery = """
                INSERT INTO PACKAGE (
                    ID,
                    CODE,
                    STATUS,
                    SHIPMENT_ID,
                    DEPARTURE_STORAGE_ID,
                    DESTINATION_STORAGE_ID
                ) VALUES (NBP02.PACKAGE_ID_SEQ.NEXTVAL, ?, ?, ?, ?, ?)
            """;

        executeInsertQuery(
            insertQuery,
            pkg.getCode(),
            pkg.getStatus(),
            pkg.getShipmentId(),
            pkg.getDepartureStorageId(),
            pkg.getDestinationStorageId()
        );

        final String selectQuery = """
                SELECT *
                FROM NBP02.PACKAGE
                ORDER BY ID DESC FETCH FIRST 1 ROWS ONLY
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity);
    }

    public List<Package> findByTransportIdAndTeamId(final Long transportId, final Long teamId) {
        final String query = """
                SELECT DISTINCT p.*
                FROM NBP02.PACKAGE p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                WHERE s.TRANSPORT_ID = ? AND d.TEAM_ID = ?
            """;

        return executeListSelectQuery(query, this::mapToEntity, transportId, teamId);
    }

}
