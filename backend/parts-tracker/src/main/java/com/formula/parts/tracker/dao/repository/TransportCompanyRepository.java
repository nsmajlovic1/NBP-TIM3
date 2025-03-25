package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.TransportCompany;
import java.util.Collections;
import java.util.List;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TransportCompanyRepository {

    private final DataSource dataSource;

    public List<TransportCompany> findAll() {
        final TransportCompany company = new TransportCompany();
        company.setId(1L);
        company.setName("Company");
        company.setDescription("This is test company.");

        return Collections.singletonList(company);
    }

}
