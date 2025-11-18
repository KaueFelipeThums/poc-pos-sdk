import type { IPrinterModule } from '../../domain/contracts/IPrinterModule';
import type { PrinterResponse } from '../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../domain/enums/PrinterCapabilities';
import { PrinterStatus } from '../../domain/enums/PrinterStatus';

export class NoPrinterAdapter implements IPrinterModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  printImageBase64(_base64Image: string): Promise<PrinterResponse> {
    return Promise.resolve({
      status: PrinterStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null,
    });
  }
  getCapabilities(): PrinterCapabilities[] {
    return [];
  }
}
