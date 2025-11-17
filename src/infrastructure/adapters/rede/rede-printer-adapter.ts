import type { IPrinterModule } from '../../../domain/contracts/IPrinterModule';
import type { IExtras } from '../../../domain/entities/IExtras';
import type { PrinterResponse } from '../../../domain/entities/PrinterResponse';
import type { PrinterCapabilities } from '../../../domain/enums/PrinterCapabilities';
import { RedePrinterNative } from '../../native/rede';

export class RedePrinterAdapter implements IPrinterModule {
  async printImageBase64<TData extends IExtras = IExtras>(
    base64Image: string
  ): Promise<PrinterResponse<TData>> {
    try {
      const jsonResponse =
        await RedePrinterNative.printImageBase64(base64Image);
      return JSON.parse(jsonResponse) as PrinterResponse<TData>;
    } catch (error) {
      throw new Error(`Erro ao imprimir imagem: ${error}`);
    }
  }

  async getCapabilities(): Promise<PrinterCapabilities[]> {
    try {
      const capabilities = await RedePrinterNative.getCapabilities();
      return capabilities as PrinterCapabilities[];
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
