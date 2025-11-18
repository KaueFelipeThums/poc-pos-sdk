import type { PaymentRequestExtras } from './PaymentRequestExtras';
import { InstallmentType } from '../enums/InstallmentType';
import { PaymentType } from '../enums/PaymentType';

export interface PaymentRequest {
  type: PaymentType;
  value: number;
  installments: number;
  installmentType: InstallmentType | null;
  extras: PaymentRequestExtras | null;
}
