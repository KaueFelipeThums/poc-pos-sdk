"use strict";

export class ScannerModule {
  constructor(scannerAdapter) {
    this.scannerAdapter = scannerAdapter;
  }
  async scan() {
    return this.scannerAdapter.scan();
  }
  getCapabilities() {
    return this.scannerAdapter.getCapabilities();
  }
}
//# sourceMappingURL=scanner-module.js.map