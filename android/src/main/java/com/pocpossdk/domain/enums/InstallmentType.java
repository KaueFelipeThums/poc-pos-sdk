package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum InstallmentType {
  CREDIT_MERCHANT,
  CREDIT_ISSUER;

  public static InstallmentType fromCode(String code) {
    if (code == null)
      return CREDIT_ISSUER;
    try {
      return InstallmentType.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return CREDIT_ISSUER;
    }
  }
}
