package com.formula.parts.tracker.shared.dto.pkg;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PackageCreateRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "Code must be specified.")
    private String code;

    @NotNull(message = "Transport ID must be specified.")
    private Long transportId;

    @Size(min = 1, message = "At least one car part must be specified.")
    private List<Long> carParts;

}
