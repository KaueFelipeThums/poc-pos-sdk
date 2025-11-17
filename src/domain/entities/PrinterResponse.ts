import type { IExtras } from './IExtras';
import { PrinterStatus } from '../enums/PrinterStatus';

export interface PrinterResponse<TData extends IExtras = IExtras> {
  status: PrinterStatus;
  message: string;
  data: TData | null;
}
