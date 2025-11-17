import { PrinterStatus } from '@/domain/enums/PrinterStatus';
import type { IExtras } from './IExtras';
export interface PrinterResponse<TData extends IExtras = IExtras> {
    status: PrinterStatus;
    message: string;
    data: TData | null;
}
//# sourceMappingURL=PrinterResponse.d.ts.map