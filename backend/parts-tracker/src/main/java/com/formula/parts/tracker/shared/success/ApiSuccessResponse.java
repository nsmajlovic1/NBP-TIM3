package com.formula.parts.tracker.shared.success;

import java.io.Serial;
import java.io.Serializable;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class ApiSuccessResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private final HttpStatus statusCode;
    private final String message;

    public ApiSuccessResponse(final HttpStatus statusCode, final String message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
