import type { IScannerModule } from '../../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../../domain/enums/ScannerCapabilities';
import { ScannerStatus } from '../../../domain/enums/ScannerStatus';
import { ModuleUnavailableError } from '../../../domain/exceptions/ModuleUnavailableError';
import { RedeScannerNative } from '../../native/rede';

export class RedeScannerAdapter implements IScannerModule {
  async scan(): Promise<ScannerResponse> {
    try {
      const jsonResponse = await RedeScannerNative.scan();
      return jsonResponse as ScannerResponse;
    } catch (error) {
      if (error instanceof ModuleUnavailableError) {
        return {
          status: ScannerStatus.MODULE_NOT_AVAILABLE,
          message: `Este método não está disponível.`,
          data: null,
        };
      }

      return {
        status: ScannerStatus.UNKNOWN_ERROR,
        message: `Houve um erro ao tentar escanear.`,
        data: null,
      };
    }
  }

  getCapabilities(): ScannerCapabilities[] {
    try {
      const capabilities = RedeScannerNative.getCapabilities();
      return capabilities as ScannerCapabilities[];
    } catch {
      return [];
    }
  }
}
