import type { ScannerStatus } from '../enums/ScannerStatus';

export interface ScannerResponse {
  status: ScannerStatus;
  message: string;
  data: string | null;
}
