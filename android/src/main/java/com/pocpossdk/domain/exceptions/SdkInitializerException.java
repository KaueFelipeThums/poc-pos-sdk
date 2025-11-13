package com.pocpossdk.domain.exceptions;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class SdkInitializerException extends Exception {
  public SdkInitializerException(String message) {
    super(message);
  }

  public SdkInitializerException(String message, Throwable cause) {
    super(message, cause);
  }
}
