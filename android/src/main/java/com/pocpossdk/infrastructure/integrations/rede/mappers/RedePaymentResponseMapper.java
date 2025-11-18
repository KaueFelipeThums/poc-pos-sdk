package com.pocpossdk.infrastructure.integrations.rede.mappers;

import rede.smartrede.sdk.Receipt;
import rede.smartrede.sdk.Payment;

import com.pocpossdk.domain.enums.PaymentStatus;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;
import com.pocpossdk.shared.utils.ValueUtils;
import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentResponseData;
import com.pocpossdk.domain.entities.NoExtras;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentResponseMapper {
  public static PaymentResponse<NoExtras> map(Payment payment) {
    if (payment == null) {
      return new PaymentResponse<>(
          PaymentStatus.UNKNOWN_ERROR,
          PaymentStatus.UNKNOWN_ERROR.getDescription() + ": Pagamento não encontrado");
    }

    Receipt receipt = payment.getReceipt();
    if (receipt == null) {
      return new PaymentResponse<>(
          PaymentStatus.UNKNOWN_ERROR,
          PaymentStatus.UNKNOWN_ERROR.getDescription() + ": Recibo de pagamento não encontrado");
    }

    PaymentStatus status = RedePaymentStatusMapper.map(payment.getStatus());

    PaymentResponse<NoExtras> paymentResponse = new PaymentResponse<>(
        status,
        status.getDescription());

    if (status == PaymentStatus.SUCCESS) {
      String authorizationCode = receipt.getAUTO() != null ? receipt.getAUTO() : receipt.getCV();
      String flag = receipt.getIssuerName() != null ? receipt.getIssuerName() : "PIX";

      PaymentResponseData<NoExtras> paymentResponseData = new PaymentResponseData<>(
          authorizationCode,
          flag,
          ValueUtils.safeString(receipt.getNSU()),
          ValueUtils.doubleToLongCents(receipt.getValue()),
          ValueUtils.safeString(receipt.getCV()),
          ValueUtils.safeString(receipt.getCNPJ()),
          null,
          null);

      paymentResponse.setData(paymentResponseData);
    }

    return paymentResponse;
  }
}
