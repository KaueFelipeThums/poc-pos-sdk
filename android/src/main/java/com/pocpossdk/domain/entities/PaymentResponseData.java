package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.valueObjects.Receipt;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentResponseData {
  private final String authorizationCode;
  private final String flag;
  private final String nsu;
  private final Double amount;
  private final String cv;
  private final String cnpj;
  private final Receipt receipt;

  public PaymentResponseData(
      String authorizationCode,
      String flag,
      String nsu,
      Double amount,
      String cv,
      String cnpj,
      Receipt receipt) {
    this.authorizationCode = authorizationCode;
    this.flag = flag;
    this.cv = cv;
    this.nsu = nsu;
    this.cnpj = cnpj;
    this.amount = amount;
    this.receipt = receipt;
  }

  public PaymentResponseData(
      String authorizationCode,
      String flag,
      String nsu,
      Double amount) {
    this(authorizationCode, flag, nsu, amount, null, null, null);
  }

  public String getAuthorizationCode() {
    return authorizationCode;
  }

  public String getFlag() {
    return flag;
  }

  public String getCv() {
    return cv;
  }

  public String getNsu() {
    return nsu;
  }

  public String getCnpj() {
    return cnpj;
  }

  public Double getAmount() {
    return amount;
  }

  public Receipt getReceipt() {
    return receipt;
  }

  public WritableMap toMap() {
    WritableMap map = Arguments.createMap();

    map.putString("authorizationCode", authorizationCode != null ? authorizationCode : "");
    map.putString("flag", flag != null ? flag : "");
    map.putString("nsu", nsu != null ? nsu : "");
    map.putDouble("amount", amount != null ? amount : 0.0);
    map.putString("cv", cv != null ? cv : "");
    map.putString("cnpj", cnpj != null ? cnpj : "");

    if (receipt != null) {
      map.putMap("receipt", receipt.toMap());
    } else {
      map.putNull("receipt");
    }

    return map;
  }
}
