package com.pocpossdk.domain.exceptions;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class ScannerException extends Exception {
  public ScannerException(String message) {
    super(message);
  }

  public ScannerException(String message, Throwable cause) {
    super(message, cause);
  }
}
