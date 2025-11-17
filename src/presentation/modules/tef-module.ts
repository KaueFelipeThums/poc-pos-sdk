import type { ITefModule } from '../../domain/contracts/ITefModule';
import type { IExtras } from '../../domain/entities/IExtras';
import type { PaymentRequest } from '../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../domain/entities/PaymentResponse';
import type { TefCapabilities } from '../../domain/enums/TefCapabilities';

export class TefModule {
  constructor(private readonly tefAdapter: ITefModule) {}

  async payment<TExtras extends IExtras = IExtras>(
    request: PaymentRequest<TExtras>
  ): Promise<PaymentResponse<TExtras>> {
    return this.tefAdapter.payment(request);
  }

  getCapabilities(): TefCapabilities[] {
    return this.tefAdapter.getCapabilities();
  }
}
