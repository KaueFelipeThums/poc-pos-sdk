import { PaymentStatus } from '@/domain/enums/PaymentStatus';
import type { IExtras } from './IExtras';
import type { PaymentResponseData } from './PaymentResponseData';
type PaymentResponseError = {
    status: Exclude<PaymentStatus, PaymentStatus.SUCCESS>;
    message: string;
    data: null;
};
type PaymentResponseSuccess<TExtras extends IExtras> = {
    status: PaymentStatus.SUCCESS;
    message: string;
    data: PaymentResponseData<TExtras>;
};
export type PaymentResponse<TExtras extends IExtras = IExtras> = PaymentResponseSuccess<TExtras> | PaymentResponseError;
export {};
//# sourceMappingURL=PaymentResponse.d.ts.map