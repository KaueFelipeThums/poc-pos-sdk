import type { IExtras } from '@/domain/entities/IExtras';
import type { PrinterResponse } from '@/domain/entities/PrinterResponse';
import { PrinterCapabilities } from '@/domain/enums/PrinterCapabilities';

export interface IPrinterModule {
  printImageBase64<TData extends IExtras = IExtras>(
    base64Image: string
  ): Promise<PrinterResponse<TData>>;
  getCapabilities(): PrinterCapabilities[];
}
