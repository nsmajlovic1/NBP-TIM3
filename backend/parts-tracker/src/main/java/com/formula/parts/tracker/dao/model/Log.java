package com.formula.parts.tracker.dao.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Log extends Base {

    private String actionName;
    private String tableName;
    private LocalDateTime dateTime;
    private String dbUser;

}
