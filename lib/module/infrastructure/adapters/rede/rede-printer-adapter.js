"use strict";

import { RedePrinterNative } from "../../native/rede.js";
export class RedePrinterAdapter {
  async printImageBase64(base64Image) {
    try {
      const jsonResponse = await RedePrinterNative.printImageBase64(base64Image);
      return jsonResponse;
    } catch (error) {
      throw new Error(`Erro ao imprimir imagem: ${error}`);
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