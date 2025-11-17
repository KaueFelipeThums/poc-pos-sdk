export const NativeModules = {
  RedePrinterModule: null,
  RedeTefModule: null,
  RedeScannerModule: null,
};

export const Platform = {
  OS: 'android' as const,
  Version: 30,
  select: jest.fn((options: any) => options.android),
};
