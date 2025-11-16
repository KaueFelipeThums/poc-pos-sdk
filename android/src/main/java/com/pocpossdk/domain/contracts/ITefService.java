package com.pocpossdk.domain.contracts;

import java.util.concurrent.CompletableFuture;

import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentRequest;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface ITefService {
  <TExtras> CompletableFuture<PaymentResponse> payment(PaymentRequest<TExtras> paymentRequest);
}
