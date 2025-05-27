package com.formula.parts.tracker.shared.enums;

import lombok.Getter;

@Getter
public enum EmailSubject {

    USER_ACCESS_CREDENTIALS("User Access Credentials"),
    TRANSPORT_FINISHING_TODAY("Transport finishing today");

    private final String value;

    EmailSubject(final String value) {
        this.value = value;
    }

}
