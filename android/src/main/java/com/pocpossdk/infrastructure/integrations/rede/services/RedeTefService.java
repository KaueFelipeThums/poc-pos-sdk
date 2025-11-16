package com.pocpossdk.infrastructure.integrations.rede.services;

import java.util.concurrent.CompletableFuture;

import android.content.Intent;
import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;

import rede.smartrede.sdk.FlexTipoPagamento;
import rede.smartrede.sdk.Payment;
import rede.smartrede.sdk.RedePayments;
import rede.smartrede.sdk.Receipt;
import rede.smartrede.sdk.PaymentIntentBuilder;

import com.pocpossdk.domain.contracts.ITefService;
import com.pocpossdk.domain.contracts.IActivityResultHandler;
import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentRequest;
import com.pocpossdk.domain.exceptions.TefException;
import com.pocpossdk.domain.enums.PaymentStatus;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializer;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;
import com.pocpossdk.infrastructure.integrations.rede.mappers.RedePaymentTypeMapper;
import com.pocpossdk.infrastructure.integrations.rede.mappers.RedePaymentResponseMapper;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedeTefService implements ITefService, IActivityResultHandler {
  private static final String TAG = "RedeTefService";
  private final ReactApplicationContext context;
  private static final Integer REQUEST_CODE = 1001;
  private CompletableFuture<PaymentResponse> future;

  public RedeTefService(ReactApplicationContext context) {
    this.context = context;
  }

  public CompletableFuture<PaymentResponse> payment(PaymentRequest paymentRequest) {
    AppLogger.info(TAG, "Iniciando pagamento");
    future = new CompletableFuture<PaymentResponse>();

    try {
      Activity activity = context.getCurrentActivity();

      if (!RedeSdkInitializer.isInitialized()) {
        throw new TefException("SDK não inicializado");
      }

      FlexTipoPagamento paymentType = RedePaymentTypeMapper.map(
          paymentRequest.getType(),
          paymentRequest.getInstallments(),
          paymentRequest.getInstallmentType());

      if(paymentType == null) {
        throw new TefException("Tipo de pagamento '" + paymentRequest.getType().getDescription() + "' não suportado");
      }

      if (!paymentType.equals(FlexTipoPagamento.CREDITO_PARCELADO) &&
          !paymentType.equals(FlexTipoPagamento.CREDITO_PARCELADO_EMISSOR)) {
        paymentRequest.setInstallments(0);
      }

      RedePaymentExtras redePaymentExtras = paymentRequest.getExtras();
      RedePayments redePayments = RedeSdkInitializer.getRedePayments();

      long value = paymentRequest.getValue().longValue();
      int installments = paymentRequest.getInstallments();

      PaymentIntentBuilder paymentIntentBuilder = redePayments.intentForPaymentBuilder(
          paymentType,
          value,
          redePaymentExtras.getPackageName());
      paymentIntentBuilder.setInstallments(installments);

      Intent paymentIntent = paymentIntentBuilder.build();
      activity.startActivityForResult(paymentIntent, REQUEST_CODE);
    } catch (TefException e) {
      AppLogger.error(TAG, PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new PaymentResponse(
          PaymentStatus.UNKNOWN_ERROR,
          PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage()));
    } catch (Exception e) {
      AppLogger.error(TAG, PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(unknownErrorResponse());
    }

    return future;
  }

  public void handleActivityResult(int requestCode, int resultCode, Intent data) {
    if (future == null) {
      return;
    }

    try {
      if (requestCode != REQUEST_CODE) {
        throw new TefException("Código de requisição inválido");
      }

      if (resultCode == Activity.RESULT_CANCELED || data == null) {
        throw new TefException("Transação cancelada");
      }

      Payment payment = RedePayments.getPaymentFromIntent(data);
      PaymentResponse paymentResponse = RedePaymentResponseMapper.map(payment);

      AppLogger.info(TAG, "Processamento do pagamento concluído");
      future.complete(paymentResponse);
    } catch (TefException e) {
      AppLogger.error(TAG, PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new PaymentResponse(
          PaymentStatus.UNKNOWN_ERROR,
          PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage()));
    } catch (Exception e) {
      AppLogger.error(TAG, PaymentStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(unknownErrorResponse());
    }
  }

  private PaymentResponse unknownErrorResponse() {
    return new PaymentResponse(
        PaymentStatus.UNKNOWN_ERROR,
        PaymentStatus.UNKNOWN_ERROR.getDescription());
  }
}
