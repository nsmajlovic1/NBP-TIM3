package com.formula.parts.tracker.core.utility;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.apache.commons.lang3.StringUtils;

public class DateTimeUtils {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    private DateTimeUtils() {
    }

    public static String formatTime(final LocalDateTime dateTime) {
        if (dateTime == null) {
            return StringUtils.EMPTY;
        }

        return dateTime.format(TIME_FORMATTER);
    }

}
