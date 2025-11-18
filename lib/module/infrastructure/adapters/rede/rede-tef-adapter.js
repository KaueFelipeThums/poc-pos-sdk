"use strict";

import { PaymentStatus } from "../../../domain/enums/PaymentStatus.js";
import { ModuleUnavailableError } from "../../../domain/exceptions/ModuleUnavailableError.js";
import { RedeTefNative } from "../../native/rede.js";
export class RedeTefAdapter {
  async payment(request) {
    try {
      const jsonResponse = await RedeTefNative.payment(request);
      return jsonResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: PaymentStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null
        };
      }
      return {
        status: PaymentStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar realizar o pagamento.`,
        data: null
      };
    }
  }
  getCapabilities() {
    try {
      const capabilities = RedeTefNative.getCapabilities();
      return capabilities;
    } catch {
      return [];
    }
  }
}
//# sourceMappingURL=rede-tef-adapter.js.map