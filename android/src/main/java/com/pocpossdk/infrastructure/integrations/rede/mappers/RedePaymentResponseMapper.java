package com.pocpossdk.infrastructure.integrations.rede.mappers;

import rede.smartrede.sdk.PaymentStatus as RedePaymentStatus;
import rede.smartrede.sdk.Receipt;

import com.pocpossdk.domain.enums.PaymentStatus;
import com.pocpossdk.shared.utils.ValueUtils;
import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentResponseData;
import com.pocpossdk.infrastructure.integrations.rede.mappers.RedePaymentStatusMapper;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentResponseMapper {
  public static PaymentResponse map(Receipt receipt) {
    Receipt receipt = payment.getReceipt();
    PaymentStatus status = RedePaymentStatusMapper.map(payment.getStatus());

    PaymentResponse paymentResponse = new PaymentResponse(
          status,
          status.getDescription());

    if(status  == PaymentStatus.SUCCESS) {
      String authorizationCode = receipt.getAUTO() != null ? receipt.getAUTO() : receipt.getCV();
      String flag = receipt.getIssuerName() != null ? receipt.getIssuerName() : "PIX";

      PaymentResponseData paymentResponseData = new PaymentResponseData(
          authorizationCode,
          flag,
          ValueUtils.safeString(receipt.getNSU()),
          ValueUtils.safeLong(receipt.getValue()),
          ValueUtils.safeString(receipt.getCV()),
          ValueUtils.safeString(receipt.getCNPJ()));

      paymentResponse.setData(paymentResponseData);
    }

    return paymentResponse;
  }
}
