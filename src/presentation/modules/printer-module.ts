import type { IPrinterModule } from '../../domain/contracts/IPrinterModule';
import type { IExtras } from '../../domain/entities/IExtras';
import type { PrinterResponse } from '../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../domain/enums/PrinterCapabilities';
import { PrinterStatus } from '../../domain/enums/PrinterStatus';

export class PrinterModule {
  constructor(private readonly printerAdapter: IPrinterModule) {}

  async printImageBase64<TData extends IExtras = IExtras>(
    base64Image: string
  ): Promise<PrinterResponse<TData>> {
    if (!base64Image || base64Image.trim() === '') {
      return {
        status: PrinterStatus.INVALID_PARAM,
        message: 'Imagem base64 não pode ser vazia',
        data: null,
      };
    }

    return this.printerAdapter.printImageBase64(base64Image);
  }

  getCapabilities(): PrinterCapabilities[] {
    return this.printerAdapter.getCapabilities();
  }
}
