import type { PrinterResponseData } from './PrinterResponseData';
import { PrinterStatus } from '../enums/PrinterStatus';
export interface PrinterResponse {
    status: PrinterStatus;
    message: string;
    data: PrinterResponseData | null;
}
//# sourceMappingURL=PrinterResponse.d.ts.map