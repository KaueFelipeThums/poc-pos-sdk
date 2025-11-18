jest.mock('@/infrastructure/adapters/rede/rede-tef-adapter', () => {
  const { MockTefAdapter } = jest.requireActual('../__mocks__/adapters.mock');
  return {
    RedeTefAdapter: MockTefAdapter,
  };
});

jest.mock('@/infrastructure/adapters/rede/rede-printer-adapter', () => {
  const { MockPrinterAdapter } = jest.requireActual(
    '../__mocks__/adapters.mock'
  );
  return {
    RedePrinterAdapter: MockPrinterAdapter,
  };
});

jest.mock('@/infrastructure/adapters/rede/rede-scanner-adapter', () => {
  const { MockScannerAdapter } = jest.requireActual(
    '../__mocks__/adapters.mock'
  );
  return {
    RedeScannerAdapter: MockScannerAdapter,
  };
});
