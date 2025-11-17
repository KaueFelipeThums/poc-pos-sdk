import { NativeModules } from 'react-native';
import type { IPrinterNativeModule } from '@/domain/contracts/IPrinterNativeModule';
import type { IScannerNativeModule } from '@/domain/contracts/IScannerNativeModule';
import type { ITefNativeModule } from '@/domain/contracts/ITefNativeModule';

const ERROR = 'O pacote não está vinculado corretamente.';

export const RedePrinterNative = NativeModules.RedePrinterModule
  ? (NativeModules.RedePrinterModule as IPrinterNativeModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new Error(ERROR);
        },
      }
    ) as IPrinterNativeModule);

export const RedeTefNative = NativeModules.RedeTefModule
  ? (NativeModules.RedeTefModule as ITefNativeModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new Error(ERROR);
        },
      }
    ) as ITefNativeModule);

export const RedeScannerNative = NativeModules.RedeScannerModule
  ? (NativeModules.RedeScannerModule as IScannerNativeModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new Error(ERROR);
        },
      }
    ) as IScannerNativeModule);
