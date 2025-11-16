package com.pocpossdk.infrastructure.integrations.rede.mappers;

import com.pocpossdk.domain.enums.PaymentStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentStatusMapper {
  public static PaymentStatus map(rede.smartrede.sdk.PaymentStatus status) {
    if (status == null)
      return PaymentStatus.UNKNOWN_ERROR;

    switch (status) {
      case AUTHORIZED:
        return PaymentStatus.SUCCESS;

      case FAILED:
        return PaymentStatus.FAILED;

      case DECLINED:
        return PaymentStatus.DENIED;

      default:
        return PaymentStatus.UNKNOWN_ERROR;
    }
  }
}
