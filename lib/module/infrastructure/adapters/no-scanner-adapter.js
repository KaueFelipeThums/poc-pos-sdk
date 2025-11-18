"use strict";

import { ScannerStatus } from "../../domain/enums/ScannerStatus.js";
export class NoScannerAdapter {
  scan() {
    return Promise.resolve({
      status: ScannerStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null
    });
  }
  getCapabilities() {
    return [];
  }
}
//# sourceMappingURL=no-scanner-adapter.js.map