"use strict";

import { PrinterStatus } from '@/domain/enums/PrinterStatus';
export class PrinterModule {
  constructor(printerAdapter) {
    this.printerAdapter = printerAdapter;
  }
  async printImageBase64(base64Image) {
    if (!base64Image || base64Image.trim() === '') {
      return {
        status: PrinterStatus.INVALID_PARAM,
        message: 'Imagem base64 não pode ser vazia',
        data: null
      };
    }
    return this.printerAdapter.printImageBase64(base64Image);
  }
  getCapabilities() {
    return this.printerAdapter.getCapabilities();
  }
}
//# sourceMappingURL=printer-module.js.map