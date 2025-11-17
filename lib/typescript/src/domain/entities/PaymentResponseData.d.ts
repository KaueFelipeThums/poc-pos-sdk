import type { IExtras } from './IExtras';
import type { Receipt } from '../valueObjects/Receipt';
export interface PaymentResponseData<TExtras extends IExtras = IExtras> {
    authorizationCode: string;
    flag: string;
    nsu: string;
    amount: number;
    cv: string;
    cnpj: string;
    receipt: Receipt | null;
    extras: TExtras | null;
}
//# sourceMappingURL=PaymentResponseData.d.ts.map