import type { Receipt } from '@/domain/valueObjects/Receipt';
import type { IExtras } from './IExtras';

export interface PaymentResponseData<TExtras extends IExtras = IExtras> {
  authorizationCode: string;
  flag: string;
  nsu: string;
  amount: number;
  cv: string;
  cnpj: string;
  receipt: Receipt | null;
  extras: TExtras | null;
}
