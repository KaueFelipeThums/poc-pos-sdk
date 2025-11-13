package com.pocpossdk.domain.exceptions;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PrinterException extends Exception {
  public PrinterException(String message) {
    super(message);
  }

  public PrinterException(String message, Throwable cause) {
    super(message, cause);
  }
}
