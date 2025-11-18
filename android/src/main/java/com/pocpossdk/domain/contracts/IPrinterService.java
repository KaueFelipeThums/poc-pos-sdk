package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

import com.pocpossdk.domain.entities.PrinterResponse;
import com.pocpossdk.domain.contracts.IMappable;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IPrinterService<TResp extends IMappable> {
  CompletableFuture<PrinterResponse<TResp>> printImageBase64(String base64Image);
}
