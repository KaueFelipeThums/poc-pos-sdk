package com.pocpossdk.domain.enums;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public enum PaymentType {
  CASH,              // Dinheiro
  CHECK,             // Cheque
  CREDIT,            // Cartão de crédito
  DEBIT,             // Cartão de débito
  INSTALLMENT,       // A Prazo
  FOOD_VOUCHER,      // Vale-alimentação
  MEAL_VOUCHER,      // Vale-refeição
  GIFT_VOUCHER,      // Vale-presente
  FUEL_VOUCHER,      // Vale-combustível
  BANK_SLIP,         // Boleto bancário
  BANK_DEPOSIT,      // Depósito bancário
  PIX,               // PIX
  TRANSFER,          // Transferência bancária (TED/DOC)
  LOYALTY,           // Programa de fidelidade/pontos
  NO_PAYMENT,        // Sem pagamento
  DEFERRED_PAYMENT,  // Posterior
  OTHER;             // Outro

  public static PaymentType fromCode(String code) {
    if(code == null) return OTHER;
    try {
      return PaymentType.valueOf(code);
    } catch (IllegalArgumentException ex) {
      return OTHER;
    }
  }
}
