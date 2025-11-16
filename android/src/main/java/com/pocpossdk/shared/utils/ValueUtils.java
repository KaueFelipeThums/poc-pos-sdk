package com.pocpossdk.shared.utils;

 /**
  * @author Kaue Thums <kaue.thums@zucchetti.com>
  */
public final class ValueUtils {
    public static String safeString(String value) {
        return value == null ? "" : value;
    }

    public static Integer safeInteger(Integer value) {
        return value == null ? 0 : value;
    }

    public static Long safeLong(Long value) {
        return value == null ? 0L : value;
    }

    public static Double safeDouble(Double value) {
        return value == null ? 0.0 : value;
    }
}
