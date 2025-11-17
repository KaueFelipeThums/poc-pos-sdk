import type { ScannerResponse } from '../entities/ScannerResponse';
import type { ScannerCapabilities } from '../enums/ScannerCapabilities';
export interface IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=IScannerModule.d.ts.map