import type { IExtras } from './IExtras';
import { InstallmentType } from '../enums/InstallmentType';
import { PaymentType } from '../enums/PaymentType';
export interface PaymentRequest<TExtras extends IExtras = IExtras> {
    type: PaymentType;
    value: number;
    installments: number;
    installmentType: InstallmentType;
    extras: TExtras | null;
}
//# sourceMappingURL=PaymentRequest.d.ts.map