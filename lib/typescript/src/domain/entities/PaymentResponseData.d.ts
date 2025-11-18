import type { PaymentResponseDataExtras } from './PaymentResponseDataExtras';
import type { Receipt } from '../valueObjects/Receipt';
export interface PaymentResponseData {
    authorizationCode: string;
    flag: string;
    nsu: string;
    amount: number;
    cv: string;
    cnpj: string;
    receipt: Receipt | null;
    extras: PaymentResponseDataExtras | null;
}
//# sourceMappingURL=PaymentResponseData.d.ts.map