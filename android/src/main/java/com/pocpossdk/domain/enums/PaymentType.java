package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PaymentType {
  CASH("Dinheiro"),
  CHECK("Cheque"),
  CREDIT("Cartão de crédito"),
  DEBIT("Cartão de débito"),
  INSTALLMENT("A Prazo"),
  FOOD_VOUCHER("Vale Alimentação"),
  MEAL_VOUCHER("Vale Refeição"),
  GIFT_VOUCHER("Vale Presente"),
  FUEL_VOUCHER("Vale Combustível"),
  BANK_SLIP("Boleto bancário"),
  BANK_DEPOSIT("Depósito bancário"),
  PIX("PIX"),
  TRANSFER("Transferência bancária"),
  LOYALTY("Programa de fidelidade"),
  NO_PAYMENT("Sem pagamento"),
  DEFERRED_PAYMENT("Posterior"),
  OTHER("Outro");

  private final String description;

  PaymentType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  public static PaymentType fromCode(String code) {
    if (code == null)
      return OTHER;
    try {
      return PaymentType.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return OTHER;
    }
  }
}
