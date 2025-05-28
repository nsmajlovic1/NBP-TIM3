package com.formula.parts.tracker.shared.dto.email;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String subject;
    private List<String> to;
    private String templatePath;
    private transient Map<String, Object> context;

}
