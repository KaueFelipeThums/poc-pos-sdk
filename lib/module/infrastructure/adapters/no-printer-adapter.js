"use strict";

import { PrinterStatus } from "../../domain/enums/PrinterStatus.js";
export class NoPrinterAdapter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  printImageBase64(_base64Image) {
    return Promise.resolve({
      status: PrinterStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null
    });
  }
  getCapabilities() {
    return [];
  }
}
//# sourceMappingURL=no-printer-adapter.js.map