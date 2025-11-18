import type { ScannerStatus } from '../enums/ScannerStatus';
type ScannerResponseSuccess = {
    status: ScannerStatus.SUCCESS;
    message: string;
    data: string;
};
type ScannerResponseError = {
    status: Exclude<ScannerStatus, ScannerStatus.SUCCESS>;
    message: string;
    data: null;
};
export type ScannerResponse = ScannerResponseSuccess | ScannerResponseError;
export {};
//# sourceMappingURL=ScannerResponse.d.ts.map