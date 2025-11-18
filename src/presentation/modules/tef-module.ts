import type { ITefModule } from '../../domain/contracts/ITefModule';
import type { PaymentRequest } from '../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../domain/entities/PaymentResponse';
import type { TefCapabilities } from '../../domain/enums/TefCapabilities';

export class TefModule {
  constructor(private readonly tefAdapter: ITefModule) {}

  async payment(request: PaymentRequest): Promise<PaymentResponse> {
    return this.tefAdapter.payment(request);
  }

  getCapabilities(): TefCapabilities[] {
    return this.tefAdapter.getCapabilities();
  }
}
