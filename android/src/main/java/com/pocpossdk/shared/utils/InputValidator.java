package com.pocpossdk.shared.utils;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public final class InputValidator {
    public static boolean isNonNull(Object value) {
        return value != null;
    }

    public static boolean isPositive(Long value) {
        return value != null && value > 0;
    }

    public static boolean isPositive(Integer value) {
        return value != null && value > 0;
    }

    public static boolean isNonEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }

    public static boolean hasMaxLength(String value, int maxLength) {
        return value == null || value.length() <= maxLength;
    }

    public static boolean hasMinLength(String value, int minLength) {
        return value == null || value.length() >= minLength;
    }

    public static boolean isBetweenLength(String value, int minLength, int maxLength) {
        return value == null || (value.length() >= minLength && value.length() <= maxLength);
    }
}

