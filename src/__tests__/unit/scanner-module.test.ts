import { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';
import { ScannerStatus } from '@/domain/enums/ScannerStatus';
import { ScannerModule } from '@/presentation/modules/scanner-module';
import {
  MockScannerAdapter,
  MockScannerAdapterWithError,
} from '../__mocks__/adapters.mock';

describe('ScannerModule', () => {
  let scannerModule: ScannerModule;
  let mockAdapter: MockScannerAdapter;

  beforeEach(() => {
    mockAdapter = new MockScannerAdapter();
    scannerModule = new ScannerModule(mockAdapter);
  });

  describe('scan', () => {
    it('deve escanear código com sucesso', async () => {
      const response = await scannerModule.scan();

      expect(response.status).toBe(ScannerStatus.SUCCESS);
      expect(response.message).toBe('Código escaneado com sucesso');
      expect(response.data).toBe('mock-scanned-code');
    });

    it('deve retornar dados de scan válidos', async () => {
      const response = await scannerModule.scan();

      expect(typeof response.data).toBe('string');
      expect(response.data).toBeTruthy();
    });

    it('deve retornar erro quando o adaptador falha', async () => {
      const errorAdapter = new MockScannerAdapterWithError();
      const errorModule = new ScannerModule(errorAdapter);

      const response = await errorModule.scan();

      expect(response.status).toBe(ScannerStatus.UNKNOWN_ERROR);
      expect(response.message).toBe('Erro ao escanear');
      expect(response.data).toBeNull();
    });

    it('deve chamar o método scan do adaptador', async () => {
      const spy = jest.spyOn(mockAdapter, 'scan');

      await scannerModule.scan();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('deve permitir múltiplas chamadas consecutivas', async () => {
      const response1 = await scannerModule.scan();
      const response2 = await scannerModule.scan();
      const response3 = await scannerModule.scan();

      expect(response1.status).toBe(ScannerStatus.SUCCESS);
      expect(response2.status).toBe(ScannerStatus.SUCCESS);
      expect(response3.status).toBe(ScannerStatus.SUCCESS);
    });

    it('não deve lançar exceções', async () => {
      await expect(scannerModule.scan()).resolves.not.toThrow();
    });

    it('deve retornar response mesmo com erro do adaptador', async () => {
      const errorAdapter = new MockScannerAdapterWithError();
      const errorModule = new ScannerModule(errorAdapter);

      const response = await errorModule.scan();

      expect(response).toBeDefined();
      expect(response.status).toBeDefined();
      expect(response.message).toBeDefined();
    });
  });

  describe('getCapabilities', () => {
    it('deve retornar as capabilities do adaptador', () => {
      const capabilities = scannerModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toContain(ScannerCapabilities.SCAN);
    });

    it('deve retornar array vazio para adaptador sem capabilities', () => {
      const errorAdapter = new MockScannerAdapterWithError();
      const errorModule = new ScannerModule(errorAdapter);

      const capabilities = errorModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toHaveLength(0);
    });

    it('deve retornar sempre o mesmo array de capabilities', () => {
      const capabilities1 = scannerModule.getCapabilities();
      const capabilities2 = scannerModule.getCapabilities();

      expect(capabilities1).toEqual(capabilities2);
    });
  });
});
