import type { ScannerResponse } from '@/domain/entities/ScannerResponse';
import type { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';
export interface IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=IScannerModule.d.ts.map