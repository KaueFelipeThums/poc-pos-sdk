import type { IScannerModule } from '@/domain/contracts/IScannerModule';
import type { ScannerResponse } from '@/domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';
export declare class ScannerModule {
    private readonly scannerAdapter;
    constructor(scannerAdapter: IScannerModule);
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=scanner-module.d.ts.map