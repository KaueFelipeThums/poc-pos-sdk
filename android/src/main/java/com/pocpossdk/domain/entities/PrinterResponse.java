package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.enums.PrinterStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PrinterResponse {
  private PrinterStatus status;
  private String message;
  private PrinterResponseData data;

  public PrinterResponse(PrinterStatus status, String message, PrinterResponseData data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public PrinterStatus getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public PrinterResponseData getData() {
    return data;
  }
}
