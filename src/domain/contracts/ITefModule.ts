import type { IExtras } from '../entities/IExtras';
import type { PaymentRequest } from '../entities/PaymentRequest';
import type { PaymentResponse } from '../entities/PaymentResponse';
import { TefCapabilities } from '../enums/TefCapabilities';

export interface ITefModule {
  payment<
    TExtras extends IExtras = IExtras,
    TRExtras extends IExtras = IExtras,
  >(
    request: PaymentRequest<TExtras>
  ): Promise<PaymentResponse<TRExtras>>;
  getCapabilities(): TefCapabilities[];
}
