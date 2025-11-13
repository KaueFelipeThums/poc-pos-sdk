package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.enums.PrinterStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PrinterResponse {
  private PrinterStatus status;
  private String message;
  private Object data;

  public PrinterResponse(PrinterStatus status, String message, Object data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public PrinterResponse(PrinterStatus status, String message) {
    this(status, message, null);
  }

  public PrinterStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public Object getData() {
    return data;
  }
}
