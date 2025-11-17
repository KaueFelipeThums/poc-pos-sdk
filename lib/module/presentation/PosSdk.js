"use strict";

import { PrinterModule } from "./modules/printer-module.js";
import { ScannerModule } from "./modules/scanner-module.js";
import { TefModule } from "./modules/tef-module.js";
import { PosSdkAdministrator } from "../domain/enums/PosSdkAdministrator.js";
import { RedePrinterAdapter } from "../infrastructure/adapters/rede/rede-printer-adapter.js";
import { RedeScannerAdapter } from "../infrastructure/adapters/rede/rede-scanner-adapter.js";
import { RedeTefAdapter } from "../infrastructure/adapters/rede/rede-tef-adapter.js";
export class PosSdkInstance {
  constructor(config) {
    this.administrator = config.administrator;
    const {
      tefAdapter,
      printerAdapter,
      scannerAdapter
    } = this.createAdapters(config.administrator);
    this.tef = new TefModule(tefAdapter);
    this.printer = new PrinterModule(printerAdapter);
    this.scanner = new ScannerModule(scannerAdapter);
  }
  createAdapters(administrator) {
    switch (administrator) {
      case PosSdkAdministrator.REDE:
        return {
          tefAdapter: new RedeTefAdapter(),
          printerAdapter: new RedePrinterAdapter(),
          scannerAdapter: new RedeScannerAdapter()
        };
      default:
        throw new Error(`Administradora não suportada: ${administrator}`);
    }
  }
  getAdministrator() {
    return this.administrator;
  }
  async getAllCapabilities() {
    const [tef, printer, scanner] = await Promise.all([this.tef.getCapabilities(), this.printer.getCapabilities(), this.scanner.getCapabilities()]);
    return {
      tef,
      printer,
      scanner,
      administrator: this.administrator
    };
  }
}
export class PosSdk {
  static instance = null;
  static init(administrator) {
    this.instance = new PosSdkInstance({
      administrator
    });
    return this.instance;
  }
  static getInstance() {
    if (!this.instance) {
      throw new Error('PosSdk não foi inicializado. Chame PosSdk.init() primeiro.');
    }
    return this.instance;
  }
  static destroy() {
    this.instance = null;
  }
}
//# sourceMappingURL=PosSdk.js.map