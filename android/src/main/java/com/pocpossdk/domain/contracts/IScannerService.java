package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IScannerService {
  CompletableFuture<String> scan();
}
