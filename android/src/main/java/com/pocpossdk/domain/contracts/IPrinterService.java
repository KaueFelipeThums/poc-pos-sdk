package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

import com.pocpossdk.domain.entities.PrinterResponse;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IPrinterService {
  <TData> CompletableFuture<PrinterResponse<TData>> printImageBase64(String base64Image);
}
