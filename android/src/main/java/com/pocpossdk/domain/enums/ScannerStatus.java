package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum ScannerStatus {
  SUCCESS("Código lido com sucesso"),
  NO_CODE_DETECTED("Nenhum código detectado"),
  UNKNOWN_ERROR("Erro desconhecido");

  private final String description;

  ScannerStatus(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public static ScannerStatus fromCode(String code) {
    if (code == null)
      return UNKNOWN_ERROR;
    try {
      return ScannerStatus.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return UNKNOWN_ERROR;
    }
  }
}
