package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.pocpossdk.domain.enums.PrinterStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PrinterResponse<TData> {
  private @NonNull PrinterStatus status;
  private @NonNull String message;
  private @Nullable TData data;

  public PrinterResponse(
      @NonNull PrinterStatus status,
      @NonNull String message,
      @Nullable TData data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public PrinterResponse(
      @NonNull PrinterStatus status,
      @NonNull String message) {
    this(status, message, null);
  }

  public @NonNull PrinterStatus getStatus() {
    return status;
  }

  public @NonNull String getMessage() {
    return message;
  }

  public @Nullable TData getData() {
    return data;
  }

  public WritableMap toMap() {
    WritableMap map = Arguments.createMap();

    map.putString("status", status.name());
    map.putString("message", message != null ? message : "");

    if (data != null) {
      map.putMap("data", data.toMap());
    } else {
      map.putNull("data");
    }

    return map;
  }
}
