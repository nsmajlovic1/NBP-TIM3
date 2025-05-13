package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Shipment;
import com.formula.parts.tracker.dao.model.ShipmentFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class ShipmentRepository extends BaseRepository<Shipment> {

    public ShipmentRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Shipment mapToEntity(final ResultSet resultSet) {
        try {
            final Shipment shipment = new Shipment();

            shipment.setId(resultSet.getLong(ShipmentFields.ID));
            shipment.setStatus(resultSet.getString(ShipmentFields.STATUS));
            shipment.setTransportId(resultSet.getLong(ShipmentFields.TRANSPORT_ID));

            return shipment;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public Long persist(final Shipment shipment) {
        final String insertQuery = """
                INSERT INTO SHIPMENT (
                    ID,
                    STATUS,
                    TRANSPORT_ID
                ) VALUES (NBP02.SHIPMENT_ID_SEQ.NEXTVAL, ?, ?)
            """;

        executeInsertQuery(
            insertQuery,
            shipment.getStatus(),
            shipment.getTransportId()
        );

        final String selectQuery = """
                SELECT *
                FROM NBP02.SHIPMENT
                ORDER BY ID DESC FETCH FIRST 1 ROWS ONLY
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity).getId();
    }

    public Optional<Shipment> findById(final Long id) {
        final String query = """
                SELECT *
                FROM NBP02.SHIPMENT
                WHERE ID = ?
            """;

        return Optional.ofNullable(executeSingleSelectQuery(query, this::mapToEntity, id));
    }

}
