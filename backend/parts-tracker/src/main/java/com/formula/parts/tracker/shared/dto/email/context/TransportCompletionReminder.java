package com.formula.parts.tracker.shared.dto.email.context;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportCompletionReminder implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String transportId;
    private String endTime;
    private String location;
    private List<String> packageCodes;
    private String footerText;

}
