export interface IPrinterNativeModule {
  printImageBase64(base64Image: string): Promise<string>;
  getCapabilities(): Promise<string[]>;
}
