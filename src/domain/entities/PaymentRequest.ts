import { InstallmentType } from '@/domain/enums/InstallmentType';
import { PaymentType } from '@/domain/enums/PaymentType';
import type { IExtras } from './IExtras';

export interface PaymentRequest<TExtras extends IExtras = IExtras> {
  type: PaymentType;
  value: number;
  installments: number;
  installmentType: InstallmentType;
  extras: TExtras | null;
}
