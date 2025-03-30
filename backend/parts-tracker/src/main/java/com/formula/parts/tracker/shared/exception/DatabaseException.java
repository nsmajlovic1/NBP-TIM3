package com.formula.parts.tracker.shared.exception;

public class DatabaseException extends RuntimeException {

    public DatabaseException() {
        super();
    }

    public DatabaseException(final String message) {
        super(message);
    }

}
