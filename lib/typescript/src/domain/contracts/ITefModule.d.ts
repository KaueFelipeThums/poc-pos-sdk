import type { PaymentRequest } from '../entities/PaymentRequest';
import type { PaymentResponse } from '../entities/PaymentResponse';
import { TefCapabilities } from '../enums/TefCapabilities';
export interface ITefModule {
    payment(request: PaymentRequest): Promise<PaymentResponse>;
    getCapabilities(): TefCapabilities[];
}
//# sourceMappingURL=ITefModule.d.ts.map