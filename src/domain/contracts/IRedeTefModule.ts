import type { IExtras } from '../entities/IExtras';
import type { PaymentRequest } from '../entities/PaymentRequest';
import type { PaymentResponse } from '../entities/PaymentResponse';
import type { TefCapabilities } from '../enums/TefCapabilities';

export interface IRedeTefModule {
  payment<TData extends IExtras = IExtras>(
    request: PaymentRequest<TData>
  ): Promise<PaymentResponse<TData>>;
  getCapabilities(): Promise<TefCapabilities[]>;
}
