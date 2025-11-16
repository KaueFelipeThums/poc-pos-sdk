package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PrinterStatus {
  SUCCESS("Impressão realizada com sucesso"),
  PENDING("Impressão em andamento"),
  OUT_OF_PAPER("Impressora sem papel"),
  COVER_OPEN("Tampa da impressora aberta"),
  LOW_BATTERY("Bateria insuficiente para imprimir"),
  HARDWARE_ERROR("Erro de hardware na impressora"),
  INVALID_PARAM("Parâmetro inválido"),
  UNKNOWN_ERROR("Erro desconhecido");

  private final String description;

  PrinterStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public static PrinterStatus fromCode(String code) {
    if (code == null)
      return UNKNOWN_ERROR;
    try {
      return PrinterStatus.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return UNKNOWN_ERROR;
    }
  }
}
