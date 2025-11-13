
package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.domain.enums.PaymentType;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentRequest<TExtras> {
  private int installments;
  private double value;
  private InstallmentType installmentType;
  private PaymentType type;
  private TExtras extras;

  public PaymentRequest(PaymentType type, double value, int installments, InstallmentType installmentType, TExtras extras) {
    this.installments = installments;
    this.value = value;
    this.installmentType = installmentType;
    this.type = type;
    this.extras = extras;
  }

  public PaymentRequest(PaymentType type, double value, int installments) {
    this(type, value, installments, null, null);
  }

  public int getInstallments() {
    return installments;
  }

  public void setInstallments(int installments) {
    this.installments = installments;
  }

  public double getValue() {
    return value;
  }

  public void setValue(double value) {
    this.value = value;
  }

  public InstallmentType getInstallmentType() {
    return installmentType;
  }

  public void setInstallmentType(InstallmentType installmentType) {
    this.installmentType = installmentType;
  }

  public PaymentType getType() {
    return type;
  }

  public void setType(PaymentType type) {
    this.type = type;
  }

  public TExtras getExtras() {
    return extras;
  }

  public void setExtras(TExtras extras) {
    this.extras = extras;
  }
}
