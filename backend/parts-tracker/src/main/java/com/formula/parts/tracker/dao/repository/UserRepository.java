package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.dao.model.Role;
import com.formula.parts.tracker.dao.model.RoleFields;
import com.formula.parts.tracker.dao.model.User;
import com.formula.parts.tracker.dao.model.UserFields;
import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import javax.sql.DataSource;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository extends BaseRepository<User> {

    public UserRepository(final DataSource dataSource) {
        super(dataSource);
    }

    private User mapToEntityWithRole(final ResultSet resultSet) {
        try {
            final Role role = new Role();
            role.setId(resultSet.getLong(RoleFields.ID));
            role.setName(resultSet.getNString(RoleFields.NAME));

            final User user = new User();
            user.setId(resultSet.getLong(UserFields.ID));
            user.setFirstName(resultSet.getString(UserFields.FIRST_NAME));
            user.setLastName(resultSet.getString(UserFields.LAST_NAME));
            user.setEmail(resultSet.getString(UserFields.EMAIL));
            user.setPassword(resultSet.getString(UserFields.PASSWORD));
            user.setUsername(resultSet.getString(UserFields.USERNAME));
            user.setPhoneNumber(resultSet.getString(UserFields.PHONE_NUMBER));
            user.setAddressId(resultSet.getLong(UserFields.ADDRESS_ID));
            user.setRoleId(resultSet.getLong(UserFields.ROLE_ID));
            user.setBirthDate(resultSet.getTimestamp(UserFields.BIRTH_DATE).toLocalDateTime());
            user.setRole(role);

            return user;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    public Optional<User> findByUsername(final String username) {
        final String query = """
                SELECT * FROM NBP_USER u JOIN NBP_ROLE r ON u.ROLE_ID = r.ID WHERE u.USERNAME = ?
            """;

        return Optional.ofNullable(
            executeSingleSelectQuery(query, this::mapToEntityWithRole, username));
    }

    public boolean existsByUsername(final String username) {
        final String query = """
                SELECT COUNT(*) FROM NBP_USER u WHERE u.USERNAME = ?
            """;

        return executeExistsQuery(query, username);
    }

    public boolean existsByEmail(final String email) {
        final String query = """
                SELECT COUNT(*) FROM NBP_USER u WHERE u.EMAIL = ?
            """;

        return executeExistsQuery(query, email);
    }

    public User persist(final User user) {
        String insertQuery = """
                INSERT INTO NBP_USER (
                    FIRST_NAME,
                    LAST_NAME,
                    EMAIL,
                    PASSWORD,
                    USERNAME,
                    PHONE_NUMBER,
                    BIRTH_DATE,
                    ADDRESS_ID,
                    ROLE_ID
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            """;

        long id = executeInsertQuery(insertQuery, user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getPassword(), user.getUsername(), user.getPhoneNumber(),
            user.getBirthDate(), user.getAddressId(), user.getRoleId());

        user.setId(id);
        return user;
    }

    public void updatePassword(final String username, final String newPassword) {
        String updateQuery = """
                UPDATE NBP_USER
                SET PASSWORD = ?
                WHERE USERNAME = ?;
            """;

        executeUpdateQuery(updateQuery, newPassword, username);
    }
    
}
