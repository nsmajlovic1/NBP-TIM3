package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Address;
import com.formula.parts.tracker.dao.model.AddressFields;
import com.formula.parts.tracker.dao.model.Transport;
import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.dao.model.TransportCompanyFields;
import com.formula.parts.tracker.dao.model.TransportFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class TransportRepository extends BaseRepository<Transport> {

    public TransportRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Transport mapToEntity(final ResultSet resultSet) {
        try {
            final Transport transport = new Transport();

            transport.setId(resultSet.getLong(TransportFields.ID));
            transport.setType(resultSet.getString(TransportFields.TYPE));
            transport.setVehicleNumber(resultSet.getString(TransportFields.VEHICLE_NUMBER));
            transport.setCompanyId(resultSet.getLong(TransportFields.COMPANY_ID));
            transport.setCapacity(resultSet.getInt(TransportFields.CAPACITY));
            transport.setStatus(resultSet.getString(TransportFields.STATUS));
            transport.setDepartureDate(
                resultSet.getTimestamp(TransportFields.DEPARTURE_DATE).toLocalDateTime());
            transport.setExpectedArrivalDate(
                resultSet.getTimestamp(TransportFields.EXPECTED_ARRIVAL_DATE).toLocalDateTime());
            transport.setDepartureAddressId(
                resultSet.getLong(TransportFields.DEPARTURE_ADDRESS_ID));
            transport.setDestinationAddressId(
                resultSet.getLong(TransportFields.DESTINATION_ADDRESS_ID));

            final Timestamp actualArrivalTimestamp = resultSet.getTimestamp(
                TransportFields.ACTUAL_ARRIVAL_DATE);
            transport.setActualArrivalDate(
                actualArrivalTimestamp != null ? actualArrivalTimestamp.toLocalDateTime() : null);

            final TransportCompany company = new TransportCompany();
            company.setId(resultSet.getLong(TransportFields.COMPANY_ID));
            company.setName(resultSet.getString(TransportCompanyFields.NAME));
            company.setDescription(resultSet.getString(TransportCompanyFields.DESCRIPTION));
            transport.setCompany(company);

            final Address departureAddress = new Address();
            departureAddress.setId(resultSet.getLong(TransportFields.DEPARTURE_ADDRESS_ID));
            departureAddress.setStreetName(resultSet.getString(AddressFields.STREET_NAME));
            departureAddress.setCityName(resultSet.getString(AddressFields.CITY_NAME));
            departureAddress.setCountryIso(resultSet.getString(AddressFields.COUNTRY_ISO));
            departureAddress.setLongitude(resultSet.getDouble(AddressFields.LONGITUDE));
            departureAddress.setLatitude(resultSet.getDouble(AddressFields.LATITUDE));
            transport.setDepartureAddress(departureAddress);

            final Address destinationAddress = new Address();
            destinationAddress.setId(resultSet.getLong(TransportFields.DESTINATION_ADDRESS_ID));
            destinationAddress.setStreetName(resultSet.getString(AddressFields.STREET_NAME));
            destinationAddress.setCityName(resultSet.getString(AddressFields.CITY_NAME));
            destinationAddress.setCountryIso(resultSet.getString(AddressFields.COUNTRY_ISO));
            destinationAddress.setLongitude(resultSet.getDouble(AddressFields.LONGITUDE));
            destinationAddress.setLatitude(resultSet.getDouble(AddressFields.LATITUDE));
            transport.setDestinationAddress(destinationAddress);

            return transport;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public Optional<Transport> findById(final Long id) {
        final String query = """
                SELECT
                    t.*,
                    t.ID AS TRANSPORT_ID,
                    t.COMPANY_ID AS TRANSPORT_COMPANY_ID,
                    t.DEPARTURE_ADDRESS_ID AS DEPARTURE_ADDRESS_ID,
                    t.DESTINATION_ADDRESS_ID AS DESTINATION_ADDRESS_ID,
                    dep.*,
                    dep.ID AS DEPARTURE_ADDRESS_ID,
                    destination.*,
                    destination.ID AS DESTINATION_ADDRESS_ID,
                    c.*,
                    c.ID AS COMPANY_ID
                FROM NBP02.TRANSPORT t
                JOIN NBP02.ADDRESS dep ON t.DEPARTURE_ADDRESS_ID = dep.ID
                JOIN NBP02.ADDRESS destination ON t.DESTINATION_ADDRESS_ID = destination.ID
                JOIN NBP02.TRANSPORT_COMPANY c ON t.COMPANY_ID = c.ID
                WHERE t.ID = ?
            """;

        return Optional.ofNullable(
            executeSingleSelectQuery(query, this::mapToEntity, id));
    }

    public Transport persist(final Transport transport) {
        final String insertQuery = """
                INSERT INTO TRANSPORT (
                    ID,
                    TYPE,
                    VEHICLE_NUMBER,
                    COMPANY_ID,
                    DEPARTURE_DATE,
                    EXPECTED_ARRIVAL_DATE,
                    CAPACITY,
                    STATUS,
                    DEPARTURE_ADDRESS_ID,
                    DESTINATION_ADDRESS_ID
                ) VALUES (NBP02.TRANSPORT_ID_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;

        executeInsertQuery(
            insertQuery,
            transport.getType(),
            transport.getVehicleNumber(),
            transport.getCompanyId(),
            Timestamp.valueOf(transport.getDepartureDate()),
            Timestamp.valueOf(transport.getExpectedArrivalDate()),
            transport.getCapacity(),
            transport.getStatus(),
            transport.getDepartureAddressId(),
            transport.getDestinationAddressId()
        );

        final String selectQuery = """
                SELECT
                    t.*,
                    t.ID AS TRANSPORT_ID,
                    t.COMPANY_ID AS TRANSPORT_COMPANY_ID,
                    t.DEPARTURE_ADDRESS_ID AS DEPARTURE_ADDRESS_ID,
                    t.DESTINATION_ADDRESS_ID AS DESTINATION_ADDRESS_ID,
                    dep.*,
                    dep.ID AS DEPARTURE_ADDRESS_ID,
                    destination.*,
                    destination.ID AS DESTINATION_ADDRESS_ID,
                    c.*,
                    c.ID AS COMPANY_ID
                FROM NBP02.TRANSPORT t
                JOIN NBP02.ADDRESS dep ON t.DEPARTURE_ADDRESS_ID = dep.ID
                JOIN NBP02.ADDRESS destination ON t.DESTINATION_ADDRESS_ID = destination.ID
                JOIN NBP02.TRANSPORT_COMPANY c ON t.COMPANY_ID = c.ID
                ORDER BY TRANSPORT_ID DESC FETCH FIRST 1 ROWS ONLY
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity);
    }

    public List<Transport> findAll() {
        final String query = """
                SELECT
                    t.*,
                    t.ID AS TRANSPORT_ID,
                    t.COMPANY_ID AS TRANSPORT_COMPANY_ID,
                    t.DEPARTURE_ADDRESS_ID AS DEPARTURE_ADDRESS_ID,
                    t.DESTINATION_ADDRESS_ID AS DESTINATION_ADDRESS_ID,
                    dep.*,
                    dep.ID AS DEPARTURE_ADDRESS_ID,
                    destination.*,
                    destination.ID AS DESTINATION_ADDRESS_ID,
                    c.*,
                    c.ID AS COMPANY_ID
                FROM NBP02.TRANSPORT t
                JOIN NBP02.ADDRESS dep ON t.DEPARTURE_ADDRESS_ID = dep.ID
                JOIN NBP02.ADDRESS destination ON t.DESTINATION_ADDRESS_ID = destination.ID
                JOIN NBP02.TRANSPORT_COMPANY c ON t.COMPANY_ID = c.ID
                ORDER BY t.ID DESC
            """;

        return executeListSelectQuery(query, this::mapToEntity);
    }

}
