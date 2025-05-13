package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.TeamMember;
import com.formula.parts.tracker.shared.dto.team.TeamMemberResponse;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TeamMemberRepository extends BaseRepository<TeamMember> {

    public TeamMemberRepository(DataSource dataSource) {
        super(dataSource);
    }

    private TeamMember mapToEntity(ResultSet resultSet) {
        try {
            TeamMember member = new TeamMember();
            member.setId(resultSet.getLong("ID"));
            member.setUserId(resultSet.getLong("USER_ID"));
            member.setTeamId(resultSet.getLong("TEAM_ID"));
            return member;
        } catch (SQLException e) {
            throw new DatabaseException();
        }
    }

    public void insert(Long teamId, Long userId) {
        String insertQuery = """
            INSERT INTO NBP02.TEAM_MEMBER (ID, TEAM_ID, USER_ID)
            VALUES (NBP02."ISEQ$$_276634".NEXTVAL, ?, ?)
        """;
        executeInsertQuery(insertQuery, teamId, userId);
    }

    public void delete(Long teamId, Long userId) {
        String deleteQuery = """
            DELETE FROM NBP02.TEAM_MEMBER
            WHERE TEAM_ID = ? AND USER_ID = ?
        """;
        executeUpdateQuery(deleteQuery, teamId, userId);
    }

    public boolean exists(Long teamId, Long userId) {
        String query = """
            SELECT COUNT(*) FROM NBP02.TEAM_MEMBER
            WHERE TEAM_ID = ? AND USER_ID = ?
        """;
        return executeExistsQuery(query, teamId, userId);
    }
}
