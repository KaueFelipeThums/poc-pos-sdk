import type { IPrinterModule } from '../../../domain/contracts/IPrinterModule';
import type { PrinterResponse } from '../../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../../domain/enums/PrinterCapabilities';
export declare class RedePrinterAdapter implements IPrinterModule {
    printImageBase64(base64Image: string): Promise<PrinterResponse>;
    getCapabilities(): PrinterCapabilities[];
}
//# sourceMappingURL=rede-printer-adapter.d.ts.map