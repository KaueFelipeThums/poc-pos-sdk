package com.pocpossdk.shared.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.pocpossdk.domain.enums.InstallmentType;
import com.pocpossdk.domain.enums.PaymentType;
import com.pocpossdk.domain.exceptions.ValidationException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public final class PaymentParamsExtractor {
    public static PaymentType extractPaymentType(@NonNull ReadableMap map) throws ValidationException {
        if (!map.hasKey("type") || !InputValidator.isNonEmpty(map.getString("type"))) {
            throw new ValidationException("O tipo de pagamento é obrigatório");
        }

        try {
            String value = map.getString("type");
            return PaymentType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Tipo de pagamento inválido");
        }
    }

    public static Long extractValue(@NonNull ReadableMap map) throws ValidationException {
        if (!map.hasKey("value")) {
            throw new ValidationException("O valor da transação é obrigatório");
        }

        long value = map.getInt("value");

        if (!InputValidator.isPositive(value)) {
            throw new ValidationException("O valor da transação deve ser maior que zero");
        }

        return value;
    }

    public static Integer extractInstallments(@NonNull ReadableMap map) {
        if (!map.hasKey("installments")) {
            return 0;
        }
        return map.getInt("installments");
    }

    public static InstallmentType extractInstallmentType(@NonNull ReadableMap map) throws ValidationException {
        if (!map.hasKey("installmentType") || map.getString("installmentType") == null) {
            return null;
        }

        try {
            String value = map.getString("installmentType");
            return InstallmentType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Tipo de parcelamento inválido");
        }
    }
}
