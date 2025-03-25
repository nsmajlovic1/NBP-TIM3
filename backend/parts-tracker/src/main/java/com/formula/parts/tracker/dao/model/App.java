package com.formula.parts.tracker.dao.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class App extends Base {

    private String appId;
    private Long managerId;
    private LocalDateTime expiryDate;

}
