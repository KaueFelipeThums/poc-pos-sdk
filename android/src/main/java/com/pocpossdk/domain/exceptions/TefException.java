package com.pocpossdk.domain.exceptions;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class TefException extends Exception {
  public TefException(String message) {
    super(message);
  }

  public TefException(String message, Throwable cause) {
    super(message, cause);
  }
}
