import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import { InstallmentType } from '@/domain/enums/InstallmentType';
import { PaymentStatus } from '@/domain/enums/PaymentStatus';
import { PaymentType } from '@/domain/enums/PaymentType';
import { TefCapabilities } from '@/domain/enums/TefCapabilities';
import { TefModule } from '@/presentation/modules/tef-module';
import {
  MockTefAdapter,
  MockTefAdapterWithError,
} from '../__mocks__/adapters.mock';

describe('TefModule', () => {
  let tefModule: TefModule;
  let mockAdapter: MockTefAdapter;

  beforeEach(() => {
    mockAdapter = new MockTefAdapter();
    tefModule = new TefModule(mockAdapter);
  });

  describe('payment', () => {
    const mockPaymentRequest: PaymentRequest = {
      type: PaymentType.CREDIT,
      value: 10000, // R$ 100,00
      installments: 1,
      installmentType: InstallmentType.CREDIT_MERCHANT,
      extras: null,
    };

    it('deve processar pagamento com sucesso', async () => {
      const response = await tefModule.payment(mockPaymentRequest);

      expect(response.status).toBe(PaymentStatus.SUCCESS);
      expect(response.message).toBe('Pagamento realizado com sucesso');
      expect(response.data).not.toBeNull();

      if (response.status === PaymentStatus.SUCCESS) {
        expect(response.data.authorizationCode).toBe('mock-auth-code');
        expect(response.data.nsu).toBe('mock-nsu');
        expect(response.data.flag).toBe('VISA');
        expect(response.data.amount).toBe(10000);
        expect(response.data.cnpj).toBe('12345678901234');
        expect(response.data.receipt).not.toBeNull();
        expect(response.data.receipt?.customerCopy).toBe('Via do cliente');
        expect(response.data.receipt?.merchantCopy).toBe(
          'Via do estabelecimento'
        );
      }
    });

    it('deve processar pagamento com diferentes tipos', async () => {
      const debitRequest: PaymentRequest = {
        ...mockPaymentRequest,
        type: PaymentType.DEBIT,
      };

      const response = await tefModule.payment(debitRequest);
      expect(response.status).toBe(PaymentStatus.SUCCESS);
    });

    it('deve processar pagamento com diferentes valores', async () => {
      const highValueRequest: PaymentRequest = {
        ...mockPaymentRequest,
        value: 100000, // R$ 1.000,00
      };

      const response = await tefModule.payment(highValueRequest);

      expect(response.status).toBe(PaymentStatus.SUCCESS);
      if (response.status === PaymentStatus.SUCCESS) {
        expect(response.data.amount).toBe(100000);
      }
    });

    it('deve processar pagamento parcelado', async () => {
      const installmentRequest: PaymentRequest = {
        ...mockPaymentRequest,
        installments: 6,
        installmentType: InstallmentType.CREDIT_ISSUER,
      };

      const response = await tefModule.payment(installmentRequest);
      expect(response.status).toBe(PaymentStatus.SUCCESS);
    });

    it('deve retornar erro quando o adaptador falha', async () => {
      const errorAdapter = new MockTefAdapterWithError();
      const errorModule = new TefModule(errorAdapter);

      const response = await errorModule.payment(mockPaymentRequest);

      expect(response.status).toBe(PaymentStatus.FAILED);
      expect(response.message).toBe('Erro ao processar pagamento');
      expect(response.data).toBeNull();
    });
  });

  describe('getCapabilities', () => {
    it('deve retornar as capabilities do adaptador', () => {
      const capabilities = tefModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toContain(TefCapabilities.PAYMENT);
    });

    it('deve retornar array vazio para adaptador sem capabilities', () => {
      const errorAdapter = new MockTefAdapterWithError();
      const errorModule = new TefModule(errorAdapter);

      const capabilities = errorModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toHaveLength(0);
    });
  });
});
