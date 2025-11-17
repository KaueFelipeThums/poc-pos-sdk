import type { ITefModule } from '@/domain/contracts/ITefModule';
import type { IExtras } from '@/domain/entities/IExtras';
import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import type { PaymentResponse } from '@/domain/entities/PaymentResponse';
import type { TefCapabilities } from '@/domain/enums/TefCapabilities';
import { RedeTefNative } from '@/infrastructure/native/rede';

export class RedeTefAdapter implements ITefModule {
  async payment<
    TExtras extends IExtras = IExtras,
    TRExtras extends IExtras = IExtras,
  >(request: PaymentRequest<TExtras>): Promise<PaymentResponse<TRExtras>> {
    try {
      const jsonResponse = await RedeTefNative.payment(request);
      return jsonResponse as PaymentResponse<TRExtras>;
    } catch (error) {
      throw new Error(`Erro ao processar pagamento: ${error}`);
    }
  }

  getCapabilities(): TefCapabilities[] {
    try {
      const capabilities = RedeTefNative.getCapabilities();
      return capabilities as TefCapabilities[];
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
