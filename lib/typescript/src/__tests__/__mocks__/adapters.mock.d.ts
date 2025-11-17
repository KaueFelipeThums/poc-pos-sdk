import type { IPrinterModule } from '@/domain/contracts/IPrinterModule';
import type { IScannerModule } from '@/domain/contracts/IScannerModule';
import type { ITefModule } from '@/domain/contracts/ITefModule';
import type { IExtras } from '@/domain/entities/IExtras';
import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import type { PaymentResponse } from '@/domain/entities/PaymentResponse';
import type { PrinterResponse } from '@/domain/entities/PrinterResponse';
import type { ScannerResponse } from '@/domain/entities/ScannerResponse';
import { PrinterCapabilities } from '@/domain/enums/PrinterCapabilities';
import { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';
import { TefCapabilities } from '@/domain/enums/TefCapabilities';
export declare class MockTefAdapter implements ITefModule {
    payment<TExtras extends IExtras = IExtras, TRExtras extends IExtras = IExtras>(request: PaymentRequest<TExtras>): Promise<PaymentResponse<TRExtras>>;
    getCapabilities(): TefCapabilities[];
}
export declare class MockPrinterAdapter implements IPrinterModule {
    printImageBase64<TData extends IExtras = IExtras>(_base64Image: string): Promise<PrinterResponse<TData>>;
    getCapabilities(): PrinterCapabilities[];
}
export declare class MockScannerAdapter implements IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
export declare class MockTefAdapterWithError implements ITefModule {
    payment<TExtras extends IExtras = IExtras, TRExtras extends IExtras = IExtras>(_request: PaymentRequest<TExtras>): Promise<PaymentResponse<TRExtras>>;
    getCapabilities(): TefCapabilities[];
}
export declare class MockPrinterAdapterWithError implements IPrinterModule {
    printImageBase64<TData extends IExtras = IExtras>(_base64Image: string): Promise<PrinterResponse<TData>>;
    getCapabilities(): PrinterCapabilities[];
}
export declare class MockScannerAdapterWithError implements IScannerModule {
    scan(): Promise<ScannerResponse>;
    getCapabilities(): ScannerCapabilities[];
}
//# sourceMappingURL=adapters.mock.d.ts.map