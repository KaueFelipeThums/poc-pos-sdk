import type { ITefModule } from '../../domain/contracts/ITefModule';
import type { PaymentRequest } from '../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../domain/entities/PaymentResponse';
import { PaymentStatus } from '../../domain/enums/PaymentStatus';
import type { TefCapabilities } from '../../domain/enums/TefCapabilities';

export class NoTefAdapter implements ITefModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payment(_request: PaymentRequest): Promise<PaymentResponse> {
    return Promise.resolve({
      status: PaymentStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null,
    });
  }

  getCapabilities(): TefCapabilities[] {
    return [];
  }
}
