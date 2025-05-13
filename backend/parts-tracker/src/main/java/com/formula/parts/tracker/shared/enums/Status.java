package com.formula.parts.tracker.shared.enums;

import lombok.Getter;

@Getter
public enum Status {

    PENDING("Pending"),
    IN_TRANSIT("In Transit"),
    FINISHED("Finished");

    private final String value;

    Status(final String value) {
        this.value = value;
    }

}
