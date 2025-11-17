import { PrinterModule } from './modules/printer-module';
import { ScannerModule } from './modules/scanner-module';
import { TefModule } from './modules/tef-module';
import type { IPrinterModule } from '../domain/contracts/IPrinterModule';
import type { IScannerModule } from '../domain/contracts/IScannerModule';
import type { ITefModule } from '../domain/contracts/ITefModule';
import { PosSdkAdministrator } from '../domain/enums/PosSdkAdministrator';
import { RedePrinterAdapter } from '../infrastructure/adapters/rede/rede-printer-adapter';
import { RedeScannerAdapter } from '../infrastructure/adapters/rede/rede-scanner-adapter';
import { RedeTefAdapter } from '../infrastructure/adapters/rede/rede-tef-adapter';

export interface PosSdkConfig {
  administrator: PosSdkAdministrator;
}

export class PosSdkInstance {
  public readonly tef: TefModule;
  public readonly printer: PrinterModule;
  public readonly scanner: ScannerModule;
  private readonly administrator: PosSdkAdministrator;

  constructor(config: PosSdkConfig) {
    this.administrator = config.administrator;

    const { tefAdapter, printerAdapter, scannerAdapter } = this.createAdapters(
      config.administrator
    );

    this.tef = new TefModule(tefAdapter);
    this.printer = new PrinterModule(printerAdapter);
    this.scanner = new ScannerModule(scannerAdapter);
  }

  private createAdapters(administrator: PosSdkAdministrator): {
    tefAdapter: ITefModule;
    printerAdapter: IPrinterModule;
    scannerAdapter: IScannerModule;
  } {
    switch (administrator) {
      case PosSdkAdministrator.REDE:
        return {
          tefAdapter: new RedeTefAdapter(),
          printerAdapter: new RedePrinterAdapter(),
          scannerAdapter: new RedeScannerAdapter(),
        };
      default:
        throw new Error(`Administradora não suportada: ${administrator}`);
    }
  }

  getAdministrator(): PosSdkAdministrator {
    return this.administrator;
  }

  async getAllCapabilities() {
    const [tef, printer, scanner] = await Promise.all([
      this.tef.getCapabilities(),
      this.printer.getCapabilities(),
      this.scanner.getCapabilities(),
    ]);

    return { tef, printer, scanner, administrator: this.administrator };
  }
}

export class PosSdk {
  private static instance: PosSdkInstance | null = null;

  static init(administrator: PosSdkAdministrator): PosSdkInstance {
    this.instance = new PosSdkInstance({ administrator });
    return this.instance;
  }

  static getInstance(): PosSdkInstance {
    if (!this.instance) {
      throw new Error(
        'PosSdk não foi inicializado. Chame PosSdk.init() primeiro.'
      );
    }
    return this.instance;
  }

  static destroy(): void {
    this.instance = null;
  }
}
