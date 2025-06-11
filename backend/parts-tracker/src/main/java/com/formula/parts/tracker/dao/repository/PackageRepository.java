package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.DriverFields;
import com.formula.parts.tracker.dao.model.Package;
import com.formula.parts.tracker.dao.model.PackageFields;
import com.formula.parts.tracker.dao.model.TransportFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

            long teamId = resultSet.getLong(DriverFields.TEAM_ID);
            pkg.setTeamId(resultSet.wasNull() ? null : teamId);

            return pkg;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    private Map.Entry<Long, Package> mapToTransportGroup(final ResultSet resultSet) {
        try {
            return Map.entry(resultSet.getLong(TransportFields.TRANSPORT_ID),
                mapToEntity(resultSet));
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }


    public Package persist(final Package pkg) {
        final String insertQuery = """
                INSERT INTO NBP02."PACKAGE" (
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
                SELECT DISTINCT p.*, d.TEAM_ID AS TEAM_ID
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                ORDER BY p.ID DESC FETCH FIRST 1 ROWS ONLY
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity);
    }

    public List<Package> findByTransportIdAndTeamId(final Long transportId, final Long teamId) {
        final String query = """
                SELECT DISTINCT p.*, d.TEAM_ID AS TEAM_ID
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                WHERE s.TRANSPORT_ID = ? AND d.TEAM_ID = ?
            """;

        return executeListSelectQuery(query, this::mapToEntity, transportId, teamId);
    }

    public long countByTeamIdAndStatus(final Long teamId, final String status) {
        final String query = """
                SELECT DISTINCT COUNT(p.ID)
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                WHERE p.STATUS = ? AND d.TEAM_ID = ?
            """;

        return executeCountQuery(query, status, teamId);
    }

    public long countByStatus(final String status) {
        final String query = """
                SELECT DISTINCT COUNT(p.ID)
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                WHERE p.STATUS = ?
            """;

        return executeCountQuery(query, status);
    }


    public Map<Long, List<Package>> findByTeamIdGroupedByTransport(final Long teamId) {
        final String query = """
                SELECT DISTINCT p.*, s.TRANSPORT_ID, d.TEAM_ID
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                WHERE d.TEAM_ID = ?
                ORDER BY s.TRANSPORT_ID DESC
            """;

        return executeListSelectQuery(query, this::mapToTransportGroup, teamId).stream()
            .collect(Collectors.groupingBy(
                Map.Entry::getKey,
                Collectors.mapping(Map.Entry::getValue, Collectors.toList())
            ));
    }

    public Map<Long, List<Package>> findGroupedByTransport() {
        final String query = """
                SELECT DISTINCT p.*, s.TRANSPORT_ID, d.TEAM_ID
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cp.DRIVER_ID = d.ID
                ORDER BY s.TRANSPORT_ID DESC
            """;

        return executeListSelectQuery(query, this::mapToTransportGroup).stream()
            .collect(Collectors.groupingBy(
                Map.Entry::getKey,
                Collectors.mapping(Map.Entry::getValue, Collectors.toList())
            ));
    }

    public List<Package> findByTransportId(final Long transportId) {
        final String query = """
                SELECT DISTINCT p.*, d.TEAM_ID AS TEAM_ID
                FROM NBP02."PACKAGE" p
                INNER JOIN NBP02.SHIPMENT s ON s.ID = p.SHIPMENT_ID
                INNER JOIN NBP02.CAR_PART cp ON p.ID = cp.PACKAGE_ID
                INNER JOIN NBP02.DRIVER d ON cP.DRIVER_ID = d.ID
                WHERE s.TRANSPORT_ID = ?
            """;

        return executeListSelectQuery(query, this::mapToEntity, transportId);
    }

}
