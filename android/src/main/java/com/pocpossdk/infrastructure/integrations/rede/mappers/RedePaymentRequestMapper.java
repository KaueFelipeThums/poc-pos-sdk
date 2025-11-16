package com.pocpossdk.infrastructure.integrations.rede.mappers;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;

import com.pocpossdk.domain.entities.PaymentRequest;
import com.pocpossdk.domain.enums.PaymentType;
import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentRequestMapper {
  public static PaymentRequest<RedePaymentExtras> map(@NonNull ReadableMap map) {


    String typeStr = map.hasKey("type") ? map.getString("type") : "DEBIT";
    Long value = map.hasKey("value") ? (long) map.getDouble("value") : 0L;
    Integer installments = map.hasKey("installments") ? map.getInt("installments") : 0;

    PaymentType type = PaymentType.valueOf(typeStr.toUpperCase());

    InstallmentType installmentType = null;
    if (map.hasKey("installmentType") && map.getString("installmentType") != null) {
      installmentType = InstallmentType.valueOf(map.getString("installmentType").toUpperCase());
    }

    RedePaymentExtras extras = null;
    if (map.hasKey("extras") && map.getMap("extras") != null) {
      ReadableMap extrasMap = map.getMap("extras");
      String packageName = extrasMap.hasKey("packageName") ?
          extrasMap.getString("packageName") : "com.userede.rede";
      extras = new RedePaymentExtras(packageName);
    } else {
      extras = new RedePaymentExtras("com.userede.rede");
    }

    return new PaymentRequest<>(type, value, installments, installmentType, extras);
  }
}
