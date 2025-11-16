package com.pocpossdk.domain.exceptions;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class ValidationException extends Exception {
  public ValidationException(String message) {
    super(message);
  }

  public ValidationException(String message, Throwable cause) {
    super(message, cause);
  }
}
