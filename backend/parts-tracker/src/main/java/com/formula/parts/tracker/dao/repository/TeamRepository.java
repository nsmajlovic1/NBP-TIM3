package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Team;
import com.formula.parts.tracker.dao.model.TransportCompany;
import com.formula.parts.tracker.shared.dto.team.TeamMemberResponse;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TeamRepository extends BaseRepository<Team> {

    public TeamRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private Team mapToEntity(final ResultSet resultSet) {
        try {
            final Team team = new Team();
            team.setId(resultSet.getLong("ID"));
            team.setName(resultSet.getString("NAME"));
            team.setDescription(resultSet.getString("DESCRIPTION"));
            team.setCountryIso(resultSet.getString("COUNTRY_ISO"));
            return team;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public boolean existsByName(final String name) {
        final String query = """
                SELECT COUNT(*) FROM NBP02.TEAM WHERE NAME = ?
            """;
        return executeExistsQuery(query, name);
    }

    public Team persist(final Team team) {
        final String insertQuery = """
                INSERT INTO NBP02.TEAM (
                    ID,
                    NAME,
                    DESCRIPTION,
                    COUNTRY_ISO
                ) VALUES (NBP02."ISEQ$$_276605".NEXTVAL, ?, ?, ?)
            """;

        executeInsertQuery(insertQuery, team.getName(), team.getDescription(), team.getCountryIso());

        final String selectQuery = """
                SELECT * FROM NBP02.TEAM WHERE NAME = ?
            """;

        return executeSingleSelectQuery(selectQuery, this::mapToEntity, team.getName());
    }

    public List<Team> findAll(Long page, Long size) {
        final String query = """
                SELECT * FROM NBP02.TEAM
                OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
            """;

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, offset, size);
    }

    public List<Team> findByNameLike(final String keyword, Long page, Long size) {
        final String query = """
            SELECT * FROM NBP02.TEAM
            WHERE LOWER(NAME) LIKE ?
            OFFSET ? ROWS FETCH NEXT ? ROWS ONLY
        """;

        // Using LOWER for case-sensitive cases
        String pattern = "%" + keyword.toLowerCase() + "%";

        long offset = (page - 1) * size;

        return executeListSelectQuery(query, this::mapToEntity, pattern, offset, size);
    }

    public List<TeamMemberResponse> findTeamMembersByTeamId(Long teamId) {
        final String query = """
            SELECT 
                tm.USER_ID,
                u.FIRST_NAME,
                u.LAST_NAME,
                u.EMAIL,
                r.NAME AS ROLE
            FROM TEAM_MEMBER tm
            JOIN NBP.NBP_USER u ON tm.USER_ID = u.ID
            JOIN NBP.NBP_ROLE r ON u.ROLE_ID = r.ID
            WHERE tm.TEAM_ID = ?
        """;

        return this.<TeamMemberResponse>executeListSelectQuery(query, resultSet -> {
            try {
                TeamMemberResponse member = new TeamMemberResponse();
                member.setUserId(resultSet.getLong("USER_ID"));
                member.setFirstName(resultSet.getString("FIRST_NAME"));
                member.setLastName(resultSet.getString("LAST_NAME"));
                member.setEmail(resultSet.getString("EMAIL"));
                member.setRole(resultSet.getString("ROLE"));
                return member;
            } catch (SQLException e) {
                throw new RuntimeException("Failed to map team member from result set", e);
            }
        }, teamId);
    }

    public List<TeamMemberResponse> findAvailableLogisticUsers() {
        final String query = """
            SELECT 
                u.ID AS USER_ID,
                u.FIRST_NAME,
                u.LAST_NAME,
                u.EMAIL,
                r.NAME AS ROLE
            FROM NBP.NBP_USER u
            JOIN NBP.NBP_ROLE r ON u.ROLE_ID = r.ID
            LEFT JOIN TEAM_MEMBER tm ON tm.USER_ID = u.ID
            WHERE LOWER(r.NAME) = 'logistic' AND tm.TEAM_ID IS NULL
        """;

        return this.<TeamMemberResponse>executeListSelectQuery(query, resultSet -> {
            try {
                TeamMemberResponse member = new TeamMemberResponse();
                member.setUserId(resultSet.getLong("USER_ID"));
                member.setFirstName(resultSet.getString("FIRST_NAME"));
                member.setLastName(resultSet.getString("LAST_NAME"));
                member.setEmail(resultSet.getString("EMAIL"));
                member.setRole(resultSet.getString("ROLE"));
                return member;
            } catch (SQLException e) {
                throw new RuntimeException("Failed to map available logistic user", e);
            }
        });
    }

    public List<TeamMemberResponse> findAvailableMechanicUsers() {
        final String query = """
            SELECT 
                u.ID AS USER_ID,
                u.FIRST_NAME,
                u.LAST_NAME,
                u.EMAIL,
                r.NAME AS ROLE
            FROM NBP.NBP_USER u
            JOIN NBP.NBP_ROLE r ON u.ROLE_ID = r.ID
            LEFT JOIN TEAM_MEMBER tm ON tm.USER_ID = u.ID
            WHERE LOWER(r.NAME) = 'mechanic' AND tm.TEAM_ID IS NULL
        """;

        return this.<TeamMemberResponse>executeListSelectQuery(query, resultSet -> {
            try {
                TeamMemberResponse member = new TeamMemberResponse();
                member.setUserId(resultSet.getLong("USER_ID"));
                member.setFirstName(resultSet.getString("FIRST_NAME"));
                member.setLastName(resultSet.getString("LAST_NAME"));
                member.setEmail(resultSet.getString("EMAIL"));
                member.setRole(resultSet.getString("ROLE"));
                return member;
            } catch (SQLException e) {
                throw new RuntimeException("Failed to map available mechanic user", e);
            }
        });
    }

    public Long countAll() {
        final String query = """
            SELECT COUNT(*) FROM NBP02.TEAM
        """;

        return executeCountQuery(query);
    }

    public Long countByNameLike(final String keyword) {
        final String query = """
            SELECT COUNT(*) FROM NBP02.TEAM
            WHERE LOWER(NAME) LIKE ?
        """;

        String pattern = "%" + keyword.toLowerCase() + "%";

        return executeCountQuery(query, pattern);
    }

    public Team findById(Long id) {
        final String query = "SELECT * FROM NBP02.TEAM WHERE ID = ?";
        return executeSingleSelectQuery(query, this::mapToEntity, id);
    }

    public boolean existsById(long id) {
        final String query = """
            SELECT COUNT(*) FROM NBP02.TEAM WHERE ID = ?
        """;

        return executeExistsQuery(query, id);
    }
}
