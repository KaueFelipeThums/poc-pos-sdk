import type { ITefModule } from '../../../domain/contracts/ITefModule';
import type { PaymentRequest } from '../../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../../domain/entities/PaymentResponse';
import type { TefCapabilities } from '../../../domain/enums/TefCapabilities';
export declare class RedeTefAdapter implements ITefModule {
    payment(request: PaymentRequest): Promise<PaymentResponse>;
    getCapabilities(): TefCapabilities[];
}
//# sourceMappingURL=rede-tef-adapter.d.ts.map