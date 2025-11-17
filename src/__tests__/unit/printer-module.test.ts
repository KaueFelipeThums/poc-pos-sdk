import { PrinterCapabilities } from '@/domain/enums/PrinterCapabilities';
import { PrinterStatus } from '@/domain/enums/PrinterStatus';
import { PrinterModule } from '@/presentation/modules/printer-module';
import {
  MockPrinterAdapter,
  MockPrinterAdapterWithError,
} from '../__mocks__/adapters.mock';

describe('PrinterModule', () => {
  let printerModule: PrinterModule;
  let mockAdapter: MockPrinterAdapter;

  beforeEach(() => {
    mockAdapter = new MockPrinterAdapter();
    printerModule = new PrinterModule(mockAdapter);
  });

  describe('printImageBase64', () => {
    const mockBase64Image =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    it('deve imprimir imagem base64 com sucesso', async () => {
      const response = await printerModule.printImageBase64(mockBase64Image);

      expect(response.status).toBe(PrinterStatus.SUCCESS);
      expect(response.message).toBe('Impressão realizada com sucesso');
      expect(response.data).toBeNull();
    });

    it('deve retornar erro quando a imagem base64 é vazia', async () => {
      const response = await printerModule.printImageBase64('');

      expect(response.status).toBe(PrinterStatus.INVALID_PARAM);
      expect(response.message).toBe('Imagem base64 não pode ser vazia');
      expect(response.data).toBeNull();
    });

    it('deve retornar erro quando a imagem base64 contém apenas espaços', async () => {
      const response = await printerModule.printImageBase64('   ');

      expect(response.status).toBe(PrinterStatus.INVALID_PARAM);
      expect(response.message).toBe('Imagem base64 não pode ser vazia');
      expect(response.data).toBeNull();
    });

    it('deve imprimir diferentes tipos de imagens base64', async () => {
      const smallImage = 'data:image/png;base64,iVBORw0KGgoAAAANS';
      const response = await printerModule.printImageBase64(smallImage);

      expect(response.status).toBe(PrinterStatus.SUCCESS);
    });

    it('deve retornar erro quando o adaptador falha', async () => {
      const errorAdapter = new MockPrinterAdapterWithError();
      const errorModule = new PrinterModule(errorAdapter);

      const response = await errorModule.printImageBase64(mockBase64Image);

      expect(response.status).toBe(PrinterStatus.UNKNOWN_ERROR);
      expect(response.message).toBe('Erro ao imprimir');
      expect(response.data).toBeNull();
    });

    it('não deve lançar erro para imagem base64 muito longa', async () => {
      const longBase64 = 'A'.repeat(10000);

      await expect(
        printerModule.printImageBase64(longBase64)
      ).resolves.not.toThrow();
    });

    it('deve validar entrada antes de chamar o adaptador', async () => {
      const spy = jest.spyOn(mockAdapter, 'printImageBase64');

      await printerModule.printImageBase64('');

      expect(spy).not.toHaveBeenCalled();
    });

    it('deve chamar o adaptador para imagem válida', async () => {
      const spy = jest.spyOn(mockAdapter, 'printImageBase64');

      await printerModule.printImageBase64(mockBase64Image);

      expect(spy).toHaveBeenCalledWith(mockBase64Image);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCapabilities', () => {
    it('deve retornar as capabilities do adaptador', () => {
      const capabilities = printerModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toContain(PrinterCapabilities.PRINT_BASE64_IMAGE);
    });

    it('deve retornar array vazio para adaptador sem capabilities', () => {
      const errorAdapter = new MockPrinterAdapterWithError();
      const errorModule = new PrinterModule(errorAdapter);

      const capabilities = errorModule.getCapabilities();

      expect(Array.isArray(capabilities)).toBe(true);
      expect(capabilities).toHaveLength(0);
    });
  });
});
