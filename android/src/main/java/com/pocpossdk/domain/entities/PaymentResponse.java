package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.pocpossdk.domain.enums.PaymentStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentResponse {
  private @NonNull PaymentStatus status;
  private @NonNull String message;
  private @Nullable PaymentResponseData data;

  public PaymentResponse(
      @NonNull PaymentStatus status,
      @NonNull String message,
      @Nullable PaymentResponseData data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public PaymentResponse(
      @NonNull PaymentStatus status,
      @NonNull String message) {
    this(status, message, null);
  }

  public @NonNull PaymentStatus getStatus() {
    return status;
  }

  public void setStatus(@NonNull PaymentStatus status) {
    this.status = status;
  }

  public @NonNull String getMessage() {
    return message;
  }

  public void setMessage(@NonNull String message) {
    this.message = message;
  }

  public @Nullable PaymentResponseData getData() {
    return data;
  }

  public void setData(@Nullable PaymentResponseData data) {
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
