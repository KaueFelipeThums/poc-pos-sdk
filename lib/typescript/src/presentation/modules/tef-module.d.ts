import type { ITefModule } from '../../domain/contracts/ITefModule';
import type { PaymentRequest } from '../../domain/entities/PaymentRequest';
import type { PaymentResponse } from '../../domain/entities/PaymentResponse';
import type { TefCapabilities } from '../../domain/enums/TefCapabilities';
export declare class TefModule {
    private readonly tefAdapter;
    constructor(tefAdapter: ITefModule);
    payment(request: PaymentRequest): Promise<PaymentResponse>;
    getCapabilities(): TefCapabilities[];
}
//# sourceMappingURL=tef-module.d.ts.map