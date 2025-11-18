import type { IScannerModule } from '../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../domain/enums/ScannerCapabilities';
export declare class NoScannerAdapter implements IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=no-scanner-adapter.d.ts.map