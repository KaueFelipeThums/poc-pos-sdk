import type { RedePaymentExtras } from '../../infrastructure/adapters/rede/types/rede-payment.types';
import type { PaymentRequest } from '../entities/PaymentRequest';
import type { PaymentResponse } from '../entities/PaymentResponse';
import type { TefCapabilities } from '../enums/TefCapabilities';

export interface IRedeTefModule {
  payment(
    request: PaymentRequest<RedePaymentExtras>
  ): Promise<PaymentResponse<RedePaymentExtras>>;
  getCapabilities(): Promise<TefCapabilities[]>;
}
