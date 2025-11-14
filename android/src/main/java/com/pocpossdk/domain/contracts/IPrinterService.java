package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

import com.pocpossdk.domain.entities.PrinterResponse;
import com.pocpossdk.domain.exceptions.PrinterException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IPrinterService {
  CompletableFuture<PrinterResponse> printImageBase64(String base64Image);
}
