import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import { InstallmentType } from '@/domain/enums/InstallmentType';
import { PaymentStatus } from '@/domain/enums/PaymentStatus';
import { PaymentType } from '@/domain/enums/PaymentType';
import { PosSdkAdministrator } from '@/domain/enums/PosSdkAdministrator';
import { PrinterStatus } from '@/domain/enums/PrinterStatus';
import { ScannerStatus } from '@/domain/enums/ScannerStatus';
import { PosSdk } from '@/presentation/PosSdk';

describe('PosSdk - Testes de Integração', () => {
  beforeEach(() => {
    PosSdk.destroy();
  });

  afterEach(() => {
    PosSdk.destroy();
  });

  describe('Fluxo completo de pagamento', () => {
    it('deve realizar um fluxo completo de pagamento', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      expect(sdk).toBeDefined();
      expect(sdk.tef).toBeDefined();
      expect(sdk.printer).toBeDefined();
      expect(sdk.scanner).toBeDefined();

      const paymentRequest: PaymentRequest = {
        type: PaymentType.CREDIT,
        value: 50000, // R$ 500,00
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      };

      const paymentResponse = await sdk.tef.payment(paymentRequest);

      expect(paymentResponse.status).toBe(PaymentStatus.SUCCESS);
      expect(paymentResponse.data).not.toBeNull();

      if (paymentResponse.status === PaymentStatus.SUCCESS) {
        const customerReceipt = paymentResponse.data.receipt?.customerCopy;
        if (customerReceipt) {
          const printResponse =
            await sdk.printer.printImageBase64(customerReceipt);
          expect(printResponse.status).toBe(PrinterStatus.SUCCESS);
        }
      }
    });

    it('deve realizar pagamento parcelado e imprimir comprovante', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const paymentRequest: PaymentRequest = {
        type: PaymentType.CREDIT,
        value: 120000, // R$ 1.200,00
        installments: 12,
        installmentType: InstallmentType.CREDIT_ISSUER,
        extras: null,
      };

      const paymentResponse = await sdk.tef.payment(paymentRequest);

      expect(paymentResponse.status).toBe(PaymentStatus.SUCCESS);

      if (paymentResponse.status === PaymentStatus.SUCCESS) {
        expect(paymentResponse.data.amount).toBe(120000);

        const merchantReceipt = paymentResponse.data.receipt?.merchantCopy;
        if (merchantReceipt) {
          const printResponse =
            await sdk.printer.printImageBase64(merchantReceipt);
          expect(printResponse.status).toBe(PrinterStatus.SUCCESS);
        }
      }
    });
  });

  describe('Fluxo de scanner', () => {
    it('deve escanear código e processar', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const scanResponse = await sdk.scanner.scan();

      expect(scanResponse.status).toBe(ScannerStatus.SUCCESS);
      expect(scanResponse.data).toBeTruthy();
      expect(typeof scanResponse.data).toBe('string');
    });
  });

  describe('Múltiplas operações', () => {
    it('deve executar múltiplas operações em sequência', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const scan1 = await sdk.scanner.scan();
      expect(scan1.status).toBe(ScannerStatus.SUCCESS);

      const payment: PaymentRequest = {
        type: PaymentType.DEBIT,
        value: 10000,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      };
      const paymentResponse = await sdk.tef.payment(payment);
      expect(paymentResponse.status).toBe(PaymentStatus.SUCCESS);

      // Terceira operação: impressão
      const printResponse =
        await sdk.printer.printImageBase64('base64-mock-image');
      expect(printResponse.status).toBe(PrinterStatus.SUCCESS);

      // Quarta operação: outro scan
      const scan2 = await sdk.scanner.scan();
      expect(scan2.status).toBe(ScannerStatus.SUCCESS);
    });

    it('deve executar operações em paralelo', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const [scanResponse, capabilities] = await Promise.all([
        sdk.scanner.scan(),
        sdk.getAllCapabilities(),
      ]);

      expect(scanResponse.status).toBe(ScannerStatus.SUCCESS);
      expect(capabilities).toBeDefined();
      expect(capabilities.tef).toBeDefined();
      expect(capabilities.printer).toBeDefined();
      expect(capabilities.scanner).toBeDefined();
    });
  });

  describe('Validação de capabilities', () => {
    it('deve obter capabilities de todos os módulos', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const capabilities = await sdk.getAllCapabilities();

      expect(capabilities.administrator).toBe(PosSdkAdministrator.REDE);
      expect(Array.isArray(capabilities.tef)).toBe(true);
      expect(Array.isArray(capabilities.printer)).toBe(true);
      expect(Array.isArray(capabilities.scanner)).toBe(true);
      expect(capabilities.tef.length).toBeGreaterThan(0);
      expect(capabilities.printer.length).toBeGreaterThan(0);
      expect(capabilities.scanner.length).toBeGreaterThan(0);
    });
  });

  describe('Tratamento de erros integrado', () => {
    it('deve validar entrada antes de processar', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      // Tentar imprimir com base64 vazio
      const printResponse = await sdk.printer.printImageBase64('');

      expect(printResponse.status).toBe(PrinterStatus.INVALID_PARAM);
      expect(printResponse.data).toBeNull();
    });

    it('deve manter estado consistente após erro', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      // Operação com erro
      await sdk.printer.printImageBase64('');

      // Operação normal após erro
      const scanResponse = await sdk.scanner.scan();
      expect(scanResponse.status).toBe(ScannerStatus.SUCCESS);

      // Outra operação normal
      const printResponse = await sdk.printer.printImageBase64('valid-base64');
      expect(printResponse.status).toBe(PrinterStatus.SUCCESS);
    });
  });

  describe('Singleton pattern em integração', () => {
    it('deve usar a mesma instância em toda a aplicação', async () => {
      const sdk1 = PosSdk.init(PosSdkAdministrator.REDE);
      const sdk2 = PosSdk.getInstance();

      expect(sdk1).toBe(sdk2);

      // Operações devem afetar a mesma instância
      const capabilities1 = await sdk1.getAllCapabilities();
      const capabilities2 = await sdk2.getAllCapabilities();

      expect(capabilities1).toEqual(capabilities2);
    });

    it('deve reinicializar corretamente após destroy', async () => {
      const sdk1 = PosSdk.init(PosSdkAdministrator.REDE);
      const payment1 = await sdk1.tef.payment({
        type: PaymentType.CREDIT,
        value: 10000,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      });

      expect(payment1.status).toBe(PaymentStatus.SUCCESS);

      PosSdk.destroy();

      const sdk2 = PosSdk.init(PosSdkAdministrator.REDE);
      const payment2 = await sdk2.tef.payment({
        type: PaymentType.CREDIT,
        value: 20000,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      });

      expect(payment2.status).toBe(PaymentStatus.SUCCESS);
      if (payment2.status === PaymentStatus.SUCCESS) {
        expect(payment2.data.amount).toBe(20000);
      }
    });
  });

  describe('Fluxo de diferentes tipos de pagamento', () => {
    it('deve processar pagamento em débito', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const paymentRequest: PaymentRequest = {
        type: PaymentType.DEBIT,
        value: 5000,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      };

      const response = await sdk.tef.payment(paymentRequest);
      expect(response.status).toBe(PaymentStatus.SUCCESS);
    });

    it('deve processar pagamento PIX', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const paymentRequest: PaymentRequest = {
        type: PaymentType.PIX,
        value: 15000,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      };

      const response = await sdk.tef.payment(paymentRequest);
      expect(response.status).toBe(PaymentStatus.SUCCESS);
    });

    it('deve processar pagamento com voucher', async () => {
      const sdk = PosSdk.init(PosSdkAdministrator.REDE);

      const paymentRequest: PaymentRequest = {
        type: PaymentType.MEAL_VOUCHER,
        value: 3500,
        installments: 1,
        installmentType: InstallmentType.CREDIT_MERCHANT,
        extras: null,
      };

      const response = await sdk.tef.payment(paymentRequest);
      expect(response.status).toBe(PaymentStatus.SUCCESS);
    });
  });
});
