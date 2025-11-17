export interface ITefNativeModule {
  payment(request: string): Promise<string>;
  getCapabilities(): string[];
}
