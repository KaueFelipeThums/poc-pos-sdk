import { NativeModules } from 'react-native';
import type { IPrinterModule } from '../../domain/contracts/IPrinterModule';
import type { IScannerModule } from '../../domain/contracts/IScannerModule';
import type { ITefModule } from '../../domain/contracts/ITefModule';
import { ModuleUnavailableError } from '../../domain/exceptions/ModuleUnavailableError';

export const RedePrinterNative = NativeModules.RedePrinterModule
  ? (NativeModules.RedePrinterModule as IPrinterModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new ModuleUnavailableError('RedePrinterModule');
        },
      }
    ) as IPrinterModule);

export const RedeTefNative = NativeModules.RedeTefModule
  ? (NativeModules.RedeTefModule as ITefModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new ModuleUnavailableError('RedeTefModule');
        },
      }
    ) as ITefModule);

export const RedeScannerNative = NativeModules.RedeScannerModule
  ? (NativeModules.RedeScannerModule as IScannerModule)
  : (new Proxy(
      {},
      {
        get() {
          throw new ModuleUnavailableError('RedeScannerModule');
        },
      }
    ) as IScannerModule);
