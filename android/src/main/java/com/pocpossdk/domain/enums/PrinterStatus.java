package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PrinterStatus {
  SUCCESS,             // OK
  PENDING,             // Em progresso
  OUT_OF_PAPER,        // Sem papel ou acabando
  COVER_OPEN,          // Tampa aberta
  LOW_BATTERY,         // Sem bateria suficiente
  HARDWARE_ERROR,      // Motor, temperatura, tensão, etc.
  INVALID_PARAM,       // Parâmetro incorreto
  UNKNOWN_ERROR;       // Qualquer outro erro não tratado

  public static PrinterStatus fromCode(String code) {
    if(code == null) return UNKNOWN_ERROR;
    try {
      return PrinterStatus.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return UNKNOWN_ERROR;
    }
  }
}
