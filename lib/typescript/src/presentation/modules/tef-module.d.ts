import type { ITefModule } from '@/domain/contracts/ITefModule';
import type { IExtras } from '@/domain/entities/IExtras';
import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import type { PaymentResponse } from '@/domain/entities/PaymentResponse';
import type { TefCapabilities } from '@/domain/enums/TefCapabilities';
export declare class TefModule {
    private readonly tefAdapter;
    constructor(tefAdapter: ITefModule);
    payment<TExtras extends IExtras = IExtras, TRExtras extends IExtras = IExtras>(request: PaymentRequest<TExtras>): Promise<PaymentResponse<TRExtras>>;
    getCapabilities(): TefCapabilities[];
}
//# sourceMappingURL=tef-module.d.ts.map