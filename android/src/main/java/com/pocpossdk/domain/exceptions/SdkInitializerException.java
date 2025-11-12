package com.zpos.domain.exceptions;

public class SdkInitializerException extends Exception {
  public SdkInitializerException(String message) {
    super(message);
  }

  public SdkInitializerException(String message, Throwable cause) {
    super(message, cause);
  }
}
