import type { IPrinterModule } from '../../../domain/contracts/IPrinterModule';
import type { PrinterResponse } from '../../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../../domain/enums/PrinterCapabilities';
import { PrinterStatus } from '../../../domain/enums/PrinterStatus';
import { ModuleUnavailableError } from '../../../domain/exceptions/ModuleUnavailableError';
import { RedePrinterNative } from '../../native/rede';

export class RedePrinterAdapter implements IPrinterModule {
  async printImageBase64(base64Image: string): Promise<PrinterResponse> {
    try {
      const jsonResponse =
        await RedePrinterNative.printImageBase64(base64Image);
      return jsonResponse as PrinterResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: PrinterStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null,
        };
      }

      return {
        status: PrinterStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar imprimir a imagem.`,
        data: null,
      };
    }
  }

  getCapabilities(): PrinterCapabilities[] {
    try {
      const capabilities = RedePrinterNative.getCapabilities();
      return capabilities as PrinterCapabilities[];
    } catch {
      return [];
    }
  }
}
