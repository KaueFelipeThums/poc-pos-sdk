export interface IScannerNativeModule {
  scan(): Promise<string>;
  getCapabilities(): string[];
}
