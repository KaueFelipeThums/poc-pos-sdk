import type { IScannerModule } from '../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../domain/enums/ScannerCapabilities';
import { ScannerStatus } from '../../domain/enums/ScannerStatus';

export class NoScannerAdapter implements IScannerModule {
  scan(): Promise<ScannerResponse> {
    return Promise.resolve({
      status: ScannerStatus.MODULE_NOT_AVAILABLE,
      message: `Este método não está disponível.`,
      data: null,
    });
  }
  getCapabilities(): ScannerCapabilities[] {
    return [];
  }
}
