"use strict";

import { PrinterStatus } from "../../../domain/enums/PrinterStatus.js";
import { ModuleUnavailableError } from "../../../domain/exceptions/ModuleUnavailableError.js";
import { RedePrinterNative } from "../../native/rede.js";
export class RedePrinterAdapter {
  async printImageBase64(base64Image) {
    try {
      const jsonResponse = await RedePrinterNative.printImageBase64(base64Image);
      return jsonResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: PrinterStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null
        };
      }
      return {
        status: PrinterStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar imprimir a imagem.`,
        data: null
      };
    }
  }
  getCapabilities() {
    try {
      const capabilities = RedePrinterNative.getCapabilities();
      return capabilities;
    } catch {
      return [];
    }
  }
}
//# sourceMappingURL=rede-printer-adapter.js.map