import type { IPrinterModule } from '../../domain/contracts/IPrinterModule';
import type { IExtras } from '../../domain/entities/IExtras';
import type { PrinterResponse } from '../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../domain/enums/PrinterCapabilities';
export declare class PrinterModule {
    private readonly printerAdapter;
    constructor(printerAdapter: IPrinterModule);
    printImageBase64<TData extends IExtras = IExtras>(base64Image: string): Promise<PrinterResponse<TData>>;
    getCapabilities(): PrinterCapabilities[];
}
//# sourceMappingURL=printer-module.d.ts.map