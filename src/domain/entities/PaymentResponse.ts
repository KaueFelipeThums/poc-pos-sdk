import type { IExtras } from './IExtras';
import type { PaymentResponseData } from './PaymentResponseData';
import { PaymentStatus } from '../enums/PaymentStatus';

export interface PaymentResponse<TExtras extends IExtras = IExtras> {
  status: PaymentStatus;
  message: string;
  data: PaymentResponseData<TExtras> | null;
}
