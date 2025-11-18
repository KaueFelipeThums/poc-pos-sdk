"use strict";

import { PaymentStatus } from "../../domain/enums/PaymentStatus.js";
export class NoTefAdapter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payment(_request) {
    return Promise.resolve({
      status: PaymentStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null
    });
  }
  getCapabilities() {
    return [];
  }
}
//# sourceMappingURL=no-tef-adapter.js.map