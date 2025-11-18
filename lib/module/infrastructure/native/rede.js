"use strict";

import { NativeModules } from 'react-native';
import { ModuleUnavailableError } from "../../domain/exceptions/ModuleUnavailableError.js";
export const RedePrinterNative = NativeModules.RedePrinterModule ? NativeModules.RedePrinterModule : new Proxy({}, {
  get() {
    throw new ModuleUnavailableError('RedePrinterModule');
  }
});
export const RedeTefNative = NativeModules.RedeTefModule ? NativeModules.RedeTefModule : new Proxy({}, {
  get() {
    throw new ModuleUnavailableError('RedeTefModule');
  }
});
export const RedeScannerNative = NativeModules.RedeScannerModule ? NativeModules.RedeScannerModule : new Proxy({}, {
  get() {
    throw new ModuleUnavailableError('RedeScannerModule');
  }
});
//# sourceMappingURL=rede.js.map