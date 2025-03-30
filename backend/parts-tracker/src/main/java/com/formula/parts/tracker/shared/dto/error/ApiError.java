package com.formula.parts.tracker.shared.dto.error;

import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiError implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String message;

    public ApiError(final String message) {
        this.message = message;
    }

}
