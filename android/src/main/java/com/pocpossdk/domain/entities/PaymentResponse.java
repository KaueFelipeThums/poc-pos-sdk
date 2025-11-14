package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.enums.PaymentStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentResponse {
  private PaymentStatus status;
  private String message;
  private PaymentResponseData data;

  public PaymentResponse(PaymentStatus status, String message, PaymentResponseData data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public PaymentResponse(PaymentStatus status, String message) {
    this(status, message, null);
  }

  public PaymentStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public PaymentResponseData getData() {
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
