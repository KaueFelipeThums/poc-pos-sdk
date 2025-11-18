import type { ITefModule } from '../../../domain/contracts/ITefModule';
import type { PaymentRequest } from '../../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../../domain/entities/PaymentResponse';
import { PaymentStatus } from '../../../domain/enums/PaymentStatus';
import type { TefCapabilities } from '../../../domain/enums/TefCapabilities';
import { ModuleUnavailableError } from '../../../domain/exceptions/ModuleUnavailableError';
import { RedeTefNative } from '../../native/rede';

export class RedeTefAdapter implements ITefModule {
  async payment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const jsonResponse = await RedeTefNative.payment(request);
      return jsonResponse as PaymentResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: PaymentStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null,
        };
      }

      return {
        status: PaymentStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar realizar o pagamento.`,
        data: null,
      };
    }
  }

  getCapabilities(): TefCapabilities[] {
    try {
      const capabilities = RedeTefNative.getCapabilities();
      return capabilities as TefCapabilities[];
    } catch {
      return [];
    }
  }
}
