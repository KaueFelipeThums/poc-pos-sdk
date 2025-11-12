
package com.zpos.domain.entities;

public class PaymentRequest {
  private Integer value;
  private String type;
  private Integer installments;

  public PaymentRequest(Integer value, String type, Integer installments) {
    this.value = value;
    this.type = type;
    this.installments = installments;
  }

  public Integer getValue() {
    return value;
  }

  public String getType() {
    return type;
  }

  public Integer getInstallments() {
    return installments;
  }

  public void setInstallments(Integer installments) {
    this.installments = installments;
  }
}
