package com.pocpossdk.infrastructure.integrations.rede.mappers;

import rede.smartrede.sdk.FlexTipoPagamento;

import com.pocpossdk.domain.enums.PaymentType;
import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.domain.exceptions.TefException;

/**
 * @author Kaue Thums <kaue.thums@example.com>
 */
public class RedePaymentTypeMapper {
  public static FlexTipoPagamento map(PaymentType type, int installments, InstallmentType installmentType)
      throws TefException {
    if (type == null)
      return null;

    switch (type) {
      case CREDIT:
        if (installments > 1) {
          if (installmentType == InstallmentType.CREDIT_MERCHANT) {
            return FlexTipoPagamento.CREDITO_PARCELADO;
          } else {
            return FlexTipoPagamento.CREDITO_PARCELADO_EMISSOR;
          }
        }

        return FlexTipoPagamento.CREDITO_A_VISTA;

      case DEBIT:
        return FlexTipoPagamento.DEBITO;

      case FOOD_VOUCHER:
      case MEAL_VOUCHER:
      case GIFT_VOUCHER:
      case FUEL_VOUCHER:
        return FlexTipoPagamento.VOUCHER;

      case PIX:
        return FlexTipoPagamento.PIX;

      default:
        return null;
    }
  }
}
