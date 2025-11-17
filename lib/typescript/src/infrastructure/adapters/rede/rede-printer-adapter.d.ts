import type { IPrinterModule } from '@/domain/contracts/IPrinterModule';
import type { IExtras } from '@/domain/entities/IExtras';
import type { PrinterResponse } from '@/domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '@/domain/enums/PrinterCapabilities';
export declare class RedePrinterAdapter implements IPrinterModule {
    printImageBase64<TData extends IExtras = IExtras>(base64Image: string): Promise<PrinterResponse<TData>>;
    getCapabilities(): PrinterCapabilities[];
}
//# sourceMappingURL=rede-printer-adapter.d.ts.map