"use strict";

import { ScannerStatus } from "../../../domain/enums/ScannerStatus.js";
import { ModuleUnavailableError } from "../../../domain/exceptions/ModuleUnavailableError.js";
import { RedeScannerNative } from "../../native/rede.js";
export class RedeScannerAdapter {
  async scan() {
    try {
      const jsonResponse = await RedeScannerNative.scan();
      return jsonResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: ScannerStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null
        };
      }
      return {
        status: ScannerStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar escanear.`,
        data: null
      };
    }
  }
  getCapabilities() {
    try {
      const capabilities = RedeScannerNative.getCapabilities();
      return capabilities;
    } catch {
      return [];
    }
  }
}
//# sourceMappingURL=rede-scanner-adapter.js.map