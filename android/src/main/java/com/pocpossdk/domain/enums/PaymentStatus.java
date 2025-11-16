package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PaymentStatus {
  SUCCESS("Transação realizada com sucesso"),
  PENDING("Transação em andamento"),
  DENIED("Transação negada"),
  CANCELED("Transação cancelada"),
  FAILED("Transação falhou"),
  INVALID_REQUEST("Requisição inválida"),
  UNKNOWN_ERROR("Erro desconhecido");

  private final String description;

  PaymentStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public static PaymentStatus fromCode(String code) {
    if (code == null)
      return UNKNOWN_ERROR;
    try {
      return PaymentStatus.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return UNKNOWN_ERROR;
    }
  }
}
