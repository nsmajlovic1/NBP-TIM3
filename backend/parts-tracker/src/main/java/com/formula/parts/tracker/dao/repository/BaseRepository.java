package com.formula.parts.tracker.dao.repository;

import com.formula.parts.tracker.shared.exception.DatabaseException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class BaseRepository<T> {

    protected final DataSource dataSource;

    protected T executeSingleSelectQuery(final String query, final Function<ResultSet, T> mapper,
        final Object... params) {
        try (final Connection connection = dataSource.getConnection();
            final PreparedStatement statement = createPreparedStatement(connection, query, params);
            final ResultSet resultSet = statement.executeQuery()) {
            if (resultSet.next()) {
                return mapper.apply(resultSet);
            } else {
                return null;
            }
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    protected long executeInsertQuery(final String query, final Object... params) {
        try (final Connection connection = dataSource.getConnection();
            final PreparedStatement statement = createPreparedStatement(connection, query,
                params)) {
            statement.executeUpdate();

            final ResultSet resultSet = statement.getGeneratedKeys();
            resultSet.next();

            return resultSet.getLong(1);
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    protected int executeUpdateQuery(final String query, final Object... params) {
        try (final Connection connection = dataSource.getConnection();
            final PreparedStatement statement = createPreparedStatement(connection, query,
                params)) {
            return statement.executeUpdate();
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    protected boolean executeExistsQuery(final String query, final Object... params) {
        try (final Connection connection = dataSource.getConnection();
            final PreparedStatement statement = createPreparedStatement(connection, query, params);
            final ResultSet resultSet = statement.executeQuery()) {
            resultSet.next();
            return resultSet.getInt(1) > 0;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    protected List<T> executeListQuery(final String query, final Function<ResultSet, T> mapper, final Object... params) {
        List<T> results = new ArrayList<>();
        try (final Connection connection = dataSource.getConnection();
             final PreparedStatement statement = createPreparedStatement(connection, query, params);
             final ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                results.add(mapper.apply(resultSet));
            }
            return results;
        } catch (final SQLException exception) {
            throw new DatabaseException();
        }
    }

    private PreparedStatement createPreparedStatement(final Connection connection,
        final String query,
        Object[] params) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(query,
            Statement.RETURN_GENERATED_KEYS);

        for (int i = 0; i < params.length; i++) {
            statement.setObject(i + 1, params[i]);
        }

        return statement;
    }

}
