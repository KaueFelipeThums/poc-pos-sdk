import {
  PosSdk,
  PosSdkAdministrator,
  PaymentType,
  PaymentStatus,
  InstallmentType,
  PrinterStatus,
  ScannerStatus,
} from '../index';

describe('Exportações públicas da biblioteca', () => {
  it('deve exportar a classe PosSdk', () => {
    expect(PosSdk).toBeDefined();
    expect(typeof PosSdk.init).toBe('function');
    expect(typeof PosSdk.getInstance).toBe('function');
    expect(typeof PosSdk.destroy).toBe('function');
  });

  it('deve exportar todos os enums', () => {
    expect(PosSdkAdministrator).toBeDefined();
    expect(PosSdkAdministrator.REDE).toBe('REDE');

    expect(PaymentType).toBeDefined();
    expect(PaymentType.CREDIT).toBe('CREDIT');
    expect(PaymentType.DEBIT).toBe('DEBIT');

    expect(PaymentStatus).toBeDefined();
    expect(PaymentStatus.SUCCESS).toBe('SUCCESS');

    expect(InstallmentType).toBeDefined();
    expect(InstallmentType.CREDIT_MERCHANT).toBe('CREDIT_MERCHANT');

    expect(PrinterStatus).toBeDefined();
    expect(PrinterStatus.SUCCESS).toBe('SUCCESS');

    expect(ScannerStatus).toBeDefined();
    expect(ScannerStatus.SUCCESS).toBe('SUCCESS');
  });

  it('deve permitir criar instância com tipos exportados', () => {
    const sdk = PosSdk.init(PosSdkAdministrator.REDE);

    expect(sdk).toBeDefined();
    expect(sdk.tef).toBeDefined();
    expect(sdk.printer).toBeDefined();
    expect(sdk.scanner).toBeDefined();

    PosSdk.destroy();
  });
});
