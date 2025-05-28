package com.formula.parts.tracker.shared.enums;

import lombok.Getter;

@Getter
public enum NotificationSystem {

    LOGISTICS_TEAM("Formula 1 Logistics Team Notification System"),
    USER_REGISTRATION("Formula 1 User Registration Notification System");

    private final String value;

    NotificationSystem(final String value) {
        this.value = value;
    }

}
