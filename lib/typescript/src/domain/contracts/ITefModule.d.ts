import type { IExtras } from '@/domain/entities/IExtras';
import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import type { PaymentResponse } from '@/domain/entities/PaymentResponse';
import { TefCapabilities } from '@/domain/enums/TefCapabilities';
export interface ITefModule {
    payment<TExtras extends IExtras = IExtras, TRExtras extends IExtras = IExtras>(request: PaymentRequest<TExtras>): Promise<PaymentResponse<TRExtras>>;
    getCapabilities(): TefCapabilities[];
}
//# sourceMappingURL=ITefModule.d.ts.map