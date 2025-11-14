package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.enums.PrinterStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class PrinterResponse {
  private PrinterStatus status;
  private String message;
  private T data;

  public PrinterResponse(PrinterStatus status, String message, T data) {
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

  public T getData() {
    return data;
  }

  public WritableMap toMap() {
    WritableMap map = Arguments.createMap();

    map.putString("status", status.name());
    map.putString("message", message != null ? message : "");

    if (data != null) {
      map.putMap("data", data.toMap());
    } else {
      map.putNull("data");
    }

    return map;
  }
}
