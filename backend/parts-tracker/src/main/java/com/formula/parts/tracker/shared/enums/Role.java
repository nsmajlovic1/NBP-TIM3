package com.formula.parts.tracker.shared.enums;

import lombok.Getter;

@Getter
public enum Role {

    ADMIN("Admin"),
    LOGISTIC("Logistic"),
    MECHANIC("Mechanic");

    private final String value;

    Role(final String value) {
        this.value = value;
    }

}
