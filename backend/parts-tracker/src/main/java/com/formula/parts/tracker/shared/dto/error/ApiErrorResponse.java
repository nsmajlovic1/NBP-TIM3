package com.formula.parts.tracker.shared.dto.error;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiErrorResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private List<ApiError> errors;

}
