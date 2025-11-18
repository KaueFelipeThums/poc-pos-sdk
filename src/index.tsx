export { PosSdk, type PosSdkConfig } from './presentation/PosSdk';
export type { PosSdkInstance } from './presentation/PosSdk';

export { PosSdkAdministrator } from './domain/enums/PosSdkAdministrator';
export { PaymentType } from './domain/enums/PaymentType';
export { PaymentStatus } from './domain/enums/PaymentStatus';
export { InstallmentType } from './domain/enums/InstallmentType';
export { PrinterStatus } from './domain/enums/PrinterStatus';
export { ScannerStatus } from './domain/enums/ScannerStatus';
export type { TefCapabilities } from './domain/enums/TefCapabilities';
export type { PrinterCapabilities } from './domain/enums/PrinterCapabilities';
export type { ScannerCapabilities } from './domain/enums/ScannerCapabilities';

export type { PaymentRequest } from './domain/entities/PaymentRequest';
export type { PaymentResponse } from './domain/entities/PaymentResponse';
export type { PaymentResponseData } from './domain/entities/PaymentResponseData';
export type { PrinterResponse } from './domain/entities/PrinterResponse';
export type { ScannerResponse } from './domain/entities/ScannerResponse';
export type { Receipt } from './domain/valueObjects/Receipt';

export type { ITefModule } from './domain/contracts/ITefModule';
export type { IPrinterModule } from './domain/contracts/IPrinterModule';
export type { IScannerModule } from './domain/contracts/IScannerModule';
