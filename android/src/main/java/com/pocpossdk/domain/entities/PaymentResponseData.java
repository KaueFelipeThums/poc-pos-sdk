package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.pocpossdk.domain.valueObjects.Receipt;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentResponseData<TExtras> {
  private @NonNull String authorizationCode;
  private @NonNull String flag;
  private @NonNull String nsu;
  private @NonNull Double amount;
  private @NonNull String cv;
  private @NonNull String cnpj;
  private @Nullable Receipt receipt;
  private @Nullable TExtras extras;

  public PaymentResponseData(
      @NonNull String authorizationCode,
      @NonNull String flag,
      @NonNull String nsu,
      @NonNull Double amount,
      @NonNull String cv,
      @NonNull String cnpj,
      @Nullable Receipt receipt,
      @Nullable TExtras extras) {
    this.authorizationCode = authorizationCode;
    this.flag = flag;
    this.cv = cv;
    this.nsu = nsu;
    this.cnpj = cnpj;
    this.amount = amount;
    this.receipt = receipt;
    this.extras = extras;
  }

  public PaymentResponseData(
      @NonNull String authorizationCode,
      @NonNull String flag,
      @NonNull String nsu,
      @NonNull Double amount) {
    this(authorizationCode, flag, nsu, amount, "", "", null, null);
  }

  public @NonNull String getAuthorizationCode() {
    return authorizationCode;
  }

  public @NonNull String getFlag() {
    return flag;
  }

  public @NonNull String getCv() {
    return cv;
  }

  public @NonNull String getNsu() {
    return nsu;
  }

  public @NonNull String getCnpj() {
    return cnpj;
  }

  public @NonNull Double getAmount() {
    return amount;
  }

  public @Nullable Receipt getReceipt() {
    return receipt;
  }

  public @Nullable TExtras getExtras() {
    return extras;
  }

  public WritableMap toMap() {
    WritableMap map = Arguments.createMap();

    map.putString("authorizationCode", authorizationCode != null ? authorizationCode : "");
    map.putString("flag", flag != null ? flag : "");
    map.putString("nsu", nsu != null ? nsu : "");
    map.putDouble("amount", amount != null ? amount : 0);
    map.putString("cv", cv != null ? cv : "");
    map.putString("cnpj", cnpj != null ? cnpj : "");

    if (extras != null) {
      map.putMap("extras", extras.toMap());
    } else {
      map.putNull("extras");
    }

    if (receipt != null) {
      map.putMap("receipt", receipt.toMap());
    } else {
      map.putNull("receipt");
    }

    return map;
  }
}
