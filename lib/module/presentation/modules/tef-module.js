"use strict";

export class TefModule {
  constructor(tefAdapter) {
    this.tefAdapter = tefAdapter;
  }
  async payment(request) {
    return this.tefAdapter.payment(request);
  }
  getCapabilities() {
    return this.tefAdapter.getCapabilities();
  }
}
//# sourceMappingURL=tef-module.js.map