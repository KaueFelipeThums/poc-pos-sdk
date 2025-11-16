package com.pocpossdk.infrastructure.integrations.rede.mappers;

import rede.smartrede.sdk.Receipt;
import rede.smartrede.sdk.Payment;

import com.pocpossdk.domain.enums.PaymentStatus;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;
import com.pocpossdk.shared.utils.ValueUtils;
import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentResponseData;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentResponseMapper {
  public static PaymentResponse<RedePaymentExtras> map(Payment payment) {
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

    PaymentResponse<RedePaymentExtras> paymentResponse = new PaymentResponse<>(
          status,
          status.getDescription());

    if(status  == PaymentStatus.SUCCESS) {
      String authorizationCode = receipt.getAUTO() != null ? receipt.getAUTO() : receipt.getCV();
      String flag = receipt.getIssuerName() != null ? receipt.getIssuerName() : "PIX";

      PaymentResponseData<RedePaymentExtras> paymentResponseData = new PaymentResponseData<>(
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
