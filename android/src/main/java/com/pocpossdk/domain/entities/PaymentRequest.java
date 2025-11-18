package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.domain.enums.PaymentType;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentRequest<TExtras> {
  private @NonNull PaymentType type;
  private @NonNull Long value;
  private @NonNull Integer installments;
  private @Nullable InstallmentType installmentType;
  private @Nullable TExtras extras;

  public PaymentRequest(
      @NonNull PaymentType type,
      @NonNull Long value,
      @NonNull Integer installments,
      @Nullable InstallmentType installmentType,
      @Nullable TExtras extras) {
    this.installments = installments;
    this.value = value;
    this.installmentType = installmentType;
    this.type = type;
    this.extras = extras;
  }

  public PaymentRequest(
      @NonNull PaymentType type,
      @NonNull Long value,
      @NonNull Integer installments,
      @Nullable InstallmentType installmentType) {
    this(type, value, installments, installmentType, null);
  }

  public @NonNull Integer getInstallments() {
    return installments;
  }

  public void setInstallments(@NonNull Integer installments) {
    this.installments = installments;
  }

  public @NonNull Long getValue() {
    return value;
  }

  public void setValue(@NonNull Long value) {
    this.value = value;
  }

  public @NonNull PaymentType getType() {
    return type;
  }

  public void setType(@NonNull PaymentType type) {
    this.type = type;
  }

  public @Nullable InstallmentType getInstallmentType() {
    return installmentType;
  }

  public void setInstallmentType(@Nullable InstallmentType installmentType) {
    this.installmentType = installmentType;
  }

  public @Nullable TExtras getExtras() {
    return extras;
  }

  public void setExtras(@Nullable TExtras extras) {
    this.extras = extras;
  }
}
