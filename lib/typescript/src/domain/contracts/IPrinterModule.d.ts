import type { PrinterResponse } from '../entities/PrinterResponse';
import { PrinterCapabilities } from '../enums/PrinterCapabilities';
export interface IPrinterModule {
    printImageBase64(base64Image: string): Promise<PrinterResponse>;
    getCapabilities(): PrinterCapabilities[];
}
//# sourceMappingURL=IPrinterModule.d.ts.map