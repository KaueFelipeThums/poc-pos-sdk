"use strict";

import { NativeModules } from 'react-native';
const ERROR = 'O pacote não está vinculado corretamente.';
export const RedePrinterNative = NativeModules.RedePrinterModule ? NativeModules.RedePrinterModule : new Proxy({}, {
  get() {
    throw new Error(ERROR);
  }
});
export const RedeTefNative = NativeModules.RedeTefModule ? NativeModules.RedeTefModule : new Proxy({}, {
  get() {
    throw new Error(ERROR);
  }
});
export const RedeScannerNative = NativeModules.RedeScannerModule ? NativeModules.RedeScannerModule : new Proxy({}, {
  get() {
    throw new Error(ERROR);
  }
});
//# sourceMappingURL=rede.js.map