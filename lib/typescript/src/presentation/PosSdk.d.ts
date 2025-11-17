import { PosSdkAdministrator } from '@/domain/enums/PosSdkAdministrator';
import { PrinterModule } from './modules/printer-module';
import { ScannerModule } from './modules/scanner-module';
import { TefModule } from './modules/tef-module';
export interface PosSdkConfig {
    administrator: PosSdkAdministrator;
}
export declare class PosSdkInstance {
    readonly tef: TefModule;
    readonly printer: PrinterModule;
    readonly scanner: ScannerModule;
    private readonly administrator;
    constructor(config: PosSdkConfig);
    private createAdapters;
    getAdministrator(): PosSdkAdministrator;
    getAllCapabilities(): Promise<{
        tef: import("..").TefCapabilities[];
        printer: import("..").PrinterCapabilities[];
        scanner: import("..").ScannerCapabilities[];
        administrator: PosSdkAdministrator;
    }>;
}
export declare class PosSdk {
    private static instance;
    static init(administrator: PosSdkAdministrator): PosSdkInstance;
    static getInstance(): PosSdkInstance;
    static destroy(): void;
}
//# sourceMappingURL=PosSdk.d.ts.map