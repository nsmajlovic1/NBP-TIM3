package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.TransportCompany;
import java.util.Collections;
import java.util.List;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
public class TransportCompanyRepository extends BaseRepository<TransportCompany>{

    public TransportCompanyRepository(final DataSource dataSource) {
        super(dataSource);
    }


    public TransportCompany persist(final TransportCompany company)  {
        final String query = """
            INSERT INTO TRANSPORT_COMPANY (
                NAME,
                DESCRIPTION
            ) VALUES (?, ?)
        """;

        long id = executeInsertQuery(query, company.getName(), company.getDescription());
        company.setId(id);
        return company;
    }

    public List<TransportCompany> findAll() {
        final TransportCompany company = new TransportCompany();
        company.setId(1L);
        company.setName("Company");
        company.setDescription("This is test company.");

        return Collections.singletonList(company);
    }

}
