package com.pocpossdk.shared.utils;

import android.util.Log;

public class AppLogger {
  private static final String APP_NAME = "POS-SDK";

  public static void info(String tag, String message) {
    Log.i(APP_NAME + " (" + tag + ")", message);
  }

  public static void error(String tag, String message) {
    Log.e(APP_NAME + " (" + tag + ")", message);
  }

  public static void warn(String tag, String message) {
    Log.w(APP_NAME + " (" + tag + ")", message);
  }

  public static void debug(String tag, String message) {
    Log.d(APP_NAME + " (" + tag + ")", message);
  }
}
