package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

import com.pocpossdk.domain.entities.ScannerResponse;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IScannerService {
  CompletableFuture<ScannerResponse> scan();
}
