package com.formula.parts.tracker.shared.enums;

import lombok.Getter;

@Getter
public enum EmailSubject {

    INITIAL_PASSWORD("Initial Password");

    private final String value;

    EmailSubject(final String value) {
        this.value = value;
    }

}
