package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Role;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class RoleRepository extends BaseRepository<Role> {

    public RoleRepository(final DataSource dataSource) {
        super(dataSource);
    }

    public boolean existsByUsername(final Long id) {
        final String query = "SELECT COUNT(*) FROM NBP_ROLE r WHERE r.ID = ?";
        return executeExistsQuery(query, id);
    }

}
