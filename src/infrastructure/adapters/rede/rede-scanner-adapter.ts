import type { IScannerModule } from '../../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../../domain/enums/ScannerCapabilities';
import { RedeScannerNative } from '../../native/rede';

export class RedeScannerAdapter implements IScannerModule {
  async scan(): Promise<ScannerResponse> {
    try {
      const jsonResponse = await RedeScannerNative.scan();
      return jsonResponse as ScannerResponse;
    } catch (error) {
      throw new Error(`Erro ao escanear: ${error}`);
    }
  }

  getCapabilities(): ScannerCapabilities[] {
    try {
      const capabilities = RedeScannerNative.getCapabilities();
      return capabilities as ScannerCapabilities[];
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
