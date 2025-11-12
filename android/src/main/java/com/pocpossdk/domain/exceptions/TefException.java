package com.zpos.domain.exceptions;

public class TefException extends Exception {
  public TefException(String message) {
    super(message);
  }

  public TefException(String message, Throwable cause) {
    super(message, cause);
  }
}
