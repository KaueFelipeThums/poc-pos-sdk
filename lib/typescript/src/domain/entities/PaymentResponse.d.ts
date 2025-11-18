import type { PaymentResponseData } from './PaymentResponseData';
import { PaymentStatus } from '../enums/PaymentStatus';
type PaymentResponseError = {
    status: Exclude<PaymentStatus, PaymentStatus.SUCCESS>;
    message: string;
    data: null;
};
type PaymentResponseSuccess = {
    status: PaymentStatus.SUCCESS;
    message: string;
    data: PaymentResponseData;
};
export type PaymentResponse = PaymentResponseSuccess | PaymentResponseError;
export {};
//# sourceMappingURL=PaymentResponse.d.ts.map