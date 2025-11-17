import type { IScannerModule } from '../../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../../domain/enums/ScannerCapabilities';
import { ScannerStatus } from '../../../domain/enums/ScannerStatus';
import { RedeScannerNative } from '../../native/rede';

export class RedeScannerAdapter implements IScannerModule {
  async scan(): Promise<ScannerResponse> {
    try {
      const data = await RedeScannerNative.scan();

      return {
        status: ScannerStatus.SUCCESS,
        message: 'Código escaneado com sucesso',
        data,
      };
    } catch (error) {
      return {
        status: ScannerStatus.UNKNOWN_ERROR,
        message: `Erro ao escanear: ${error}`,
        data: null,
      };
    }
  }

  async getCapabilities(): Promise<ScannerCapabilities[]> {
    try {
      // Rede sempre suporta scan
      return ['SCAN' as ScannerCapabilities];
    } catch (error) {
      throw new Error(`Erro ao obter capabilities: ${error}`);
    }
  }
}
