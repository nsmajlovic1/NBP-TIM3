package com.formula.parts.tracker.core.utility;

public class LocationUtils {

    private LocationUtils() {
    }

    public static String getDisplayName(String city, String street) {
        if (city == null && street == null) {
            return "";
        }

        if (city == null) {
            return street;
        }

        if (street == null) {
            return city;
        }

        return city + ", " + street;
    }

}
