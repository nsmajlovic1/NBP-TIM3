package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.TransportCompany;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import javax.sql.DataSource;

import com.formula.parts.tracker.shared.exception.DatabaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
public class TransportCompanyRepository extends BaseRepository<TransportCompany> {

    public TransportCompanyRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private TransportCompany mapToEntity(final ResultSet resultSet) {
        try {
            final TransportCompany company = new TransportCompany();
            company.setId(resultSet.getLong("ID"));
            company.setName(resultSet.getString("NAME"));
            company.setDescription(resultSet.getString("DESCRIPTION"));
            return company;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public boolean existsByName(final String name) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.TRANSPORT_COMPANY WHERE NAME = ?
            """;
        return executeExistsQuery(query, name);
    }

    public TransportCompany persist(final TransportCompany company) {
        final String insertQuery = """
                INSERT INTO NBP02.TRANSPORT_COMPANY (
                    ID,
                    NAME,
                    DESCRIPTION
                ) VALUES (NBP02."ISEQ$$_276600".NEXTVAL, ?, ?)
            """;

        executeInsertQuery(insertQuery, company.getName(), company.getDescription());

        final String selectQuery = """
                SELECT * FROM NBP02.TRANSPORT_COMPANY WHERE NAME = ?
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity, company.getName());
    }

    public List<TransportCompany> findAll() {
        final String query = """
                SELECT * FROM NBP02.TRANSPORT_COMPANY
            """;

        return executeListSelectQuery(query, this::mapToEntity);
    }

    public List<TransportCompany> findByNameLike(final String keyword) {
        final String query = """
            SELECT * FROM NBP02.TRANSPORT_COMPANY
            WHERE LOWER(NAME) LIKE ?
        """;

        // Using LOWER for case-sensitive cases
        String pattern = "%" + keyword.toLowerCase() + "%";

        return executeListSelectQuery(query, this::mapToEntity, pattern);
    }



}
