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

  public PaymentStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public PaymentResponseData getData() {
    return data;
  }
}
