package com.formula.parts.tracker.shared.dto.statistic;

import java.io.Serial;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatisticResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String label;
    private Long count;

}
