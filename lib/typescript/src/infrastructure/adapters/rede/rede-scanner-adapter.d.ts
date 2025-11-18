import type { IScannerModule } from '../../../domain/contracts/IScannerModule';
import type { ScannerResponse } from '../../../domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '../../../domain/enums/ScannerCapabilities';
export declare class RedeScannerAdapter implements IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=rede-scanner-adapter.d.ts.map