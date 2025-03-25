package com.formula.parts.tracker.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Page<T extends Serializable> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private List<T> content;
    private Long pageNumber;
    private Long pageSize;
    private Long totalElements;
    private Long totalPages;

}
