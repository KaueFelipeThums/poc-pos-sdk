package com.pocpossdk.infrastructure.integrations.rede.mappers;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;

import com.pocpossdk.domain.entities.PaymentRequest;
import com.pocpossdk.domain.enums.PaymentType;
import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.domain.exceptions.ValidationException;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;
import com.pocpossdk.shared.utils.InputValidator;
import com.pocpossdk.shared.utils.PaymentParamsExtractor;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentRequestMapper {
  public static PaymentRequest<RedePaymentExtras> map(@NonNull ReadableMap map) throws ValidationException {

    if (!InputValidator.isNonNull(map)) {
      throw new ValidationException("Os dados da transação não foram informados");
    }

    PaymentType type = PaymentParamsExtractor.extractPaymentType(map);
    Long value = PaymentParamsExtractor.extractValue(map);
    Integer installments = PaymentParamsExtractor.extractInstallments(map);
    InstallmentType installmentType = PaymentParamsExtractor.extractInstallmentType(map);

    if (type == PaymentType.CREDIT && installmentType == null) {
      throw new ValidationException("O tipo de parcelamento é obrigatório para crédito");
    }

    if (!map.hasKey("extras") || !InputValidator.isNonNull(map.getMap("extras"))) {
      throw new ValidationException("Configurações adicionais são obrigatórias");
    }

    ReadableMap extrasMap = map.getMap("extras");

    if (!extrasMap.hasKey("redePackageName") || !InputValidator.isNonEmpty(extrasMap.getString("redePackageName"))) {
      throw new ValidationException("O nome do pacote da Rede é obrigatório");
    }

    String packageName = extrasMap.getString("redePackageName");
    RedePaymentExtras extras = new RedePaymentExtras(packageName);

    return new PaymentRequest<RedePaymentExtras>(type, value, installments, installmentType, extras);
  }
}
