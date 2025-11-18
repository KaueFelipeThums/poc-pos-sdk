import type { IPrinterModule } from '../../domain/contracts/IPrinterModule';
import type { PrinterResponse } from '../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../domain/enums/PrinterCapabilities';
export declare class NoPrinterAdapter implements IPrinterModule {
    printImageBase64(_base64Image: string): Promise<PrinterResponse>;
    getCapabilities(): PrinterCapabilities[];
}
//# sourceMappingURL=no-printer-adapter.d.ts.map