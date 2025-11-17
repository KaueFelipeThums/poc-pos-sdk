"use strict";

import { RedeTefNative } from '@/infrastructure/native/rede';
export class RedeTefAdapter {
  async payment(request) {
    try {
      const jsonResponse = await RedeTefNative.payment(request);
      return jsonResponse;
    } catch (error) {
      throw new Error(`Erro ao processar pagamento: ${error}`);
    }
  }
  getCapabilities() {
    try {
      const capabilities = RedeTefNative.getCapabilities();
      return capabilities;
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
//# sourceMappingURL=rede-tef-adapter.js.map