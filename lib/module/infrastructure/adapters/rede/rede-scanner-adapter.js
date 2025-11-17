"use strict";

import { RedeScannerNative } from '@/infrastructure/native/rede';
export class RedeScannerAdapter {
  async scan() {
    try {
      const jsonResponse = await RedeScannerNative.scan();
      return jsonResponse;
    } catch (error) {
      throw new Error(`Erro ao escanear: ${error}`);
    }
  }
  getCapabilities() {
    try {
      const capabilities = RedeScannerNative.getCapabilities();
      return capabilities;
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
//# sourceMappingURL=rede-scanner-adapter.js.map