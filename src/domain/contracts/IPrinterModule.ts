import type { IExtras } from '../entities/IExtras';
import type { PrinterResponse } from '../entities/PrinterResponse';
import { PrinterCapabilities } from '../enums/PrinterCapabilities';

export interface IPrinterModule {
  printImageBase64<TData extends IExtras = IExtras>(
    base64Image: string
  ): Promise<PrinterResponse<TData>>;
  getCapabilities(): PrinterCapabilities[];
}
