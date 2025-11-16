package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.pocpossdk.domain.enums.ScannerStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class ScannerResponse {
  private @NonNull ScannerStatus status;
  private @NonNull String message;
  private @Nullable ScannerResponseData data;

  public ScannerResponse(
      @NonNull ScannerStatus status,
      @NonNull String message,
      @Nullable ScannerResponseData data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public ScannerResponse(
      @NonNull ScannerStatus status,
      @NonNull String message) {
    this(status, message, null);
  }

  public @NonNull ScannerStatus getStatus() {
    return status;
  }

  public void setStatus(@NonNull ScannerStatus status) {
    this.status = status;
  }

  public @NonNull String getMessage() {
    return message;
  }

  public void setMessage(@NonNull String message) {
    this.message = message;
  }

  public @Nullable ScannerResponseData getData() {
    return data;
  }

  public void setData(@Nullable ScannerResponseData data) {
    this.data = data;
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
