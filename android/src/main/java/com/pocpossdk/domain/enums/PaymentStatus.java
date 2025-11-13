package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PaymentStatus {
  SUCCESS,             // OK
  PENDING,             // Em progresso
  DENIED,              // Transação Negada
  CANCELED,            // Transação Cancelada
  FAILED,              // Transação Falhou
  UNKNOWN_ERROR;       // Qualquer outro erro não tratado

  public static PaymentStatus fromCode(String code) {
    if(code == null) return UNKNOWN_ERROR;
    try {
      return PaymentStatus.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return UNKNOWN_ERROR;
    }
  }
}
