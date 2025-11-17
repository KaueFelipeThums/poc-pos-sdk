import type { IScannerModule } from '@/domain/contracts/IScannerModule';
import type { ScannerResponse } from '@/domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';

export class ScannerModule {
  constructor(private readonly scannerAdapter: IScannerModule) {}

  async scan(): Promise<ScannerResponse> {
    return this.scannerAdapter.scan();
  }

  getCapabilities(): ScannerCapabilities[] {
    return this.scannerAdapter.getCapabilities();
  }
}
