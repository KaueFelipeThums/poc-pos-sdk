package com.pocpossdk.domain.entities;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PaymentResponse {
  private final String authorizationCode;
  private final String flag;
  private final String proof;
  private final String cnpj;
  private final String nsu;
  private final Double value;

  public PaymentResponse(String authorizationCode, String flag, String proof, String cnpj, String nsu,Double value) {
    this.authorizationCode = authorizationCode;
    this.flag = flag;
    this.proof = proof;
    this.cnpj = cnpj;
    this.nsu = nsu;
    this.value = value;
  }

  public String getAuthorizationCode() {
    return authorizationCode;
  }

  public String getFlag() {
    return flag;
  }

  public String getProof() {
    return proof;
  }

  public String getCnpj() {
    return cnpj;
  }

  public String getNsu() {
    return nsu;
  }

  public Double getValue() {
    return value;
  }
}
