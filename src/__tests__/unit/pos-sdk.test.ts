import { PosSdkAdministrator } from '@/domain/enums/PosSdkAdministrator';
import { PrinterModule } from '@/presentation/modules/printer-module';
import { ScannerModule } from '@/presentation/modules/scanner-module';
import { TefModule } from '@/presentation/modules/tef-module';
import { PosSdk, PosSdkInstance } from '@/presentation/PosSdk';

describe('PosSdk', () => {
  beforeEach(() => {
    PosSdk.destroy();
  });

  afterEach(() => {
    PosSdk.destroy();
  });

  describe('init', () => {
    it('deve inicializar o PosSdk com a administradora REDE', () => {
      const instance = PosSdk.init(PosSdkAdministrator.REDE);

      expect(instance).toBeInstanceOf(PosSdkInstance);
      expect(instance.tef).toBeInstanceOf(TefModule);
      expect(instance.printer).toBeInstanceOf(PrinterModule);
      expect(instance.scanner).toBeInstanceOf(ScannerModule);
    });

    it('deve retornar a mesma instância quando init é chamado múltiplas vezes', () => {
      PosSdk.init(PosSdkAdministrator.REDE);
      const instance2 = PosSdk.init(PosSdkAdministrator.REDE);

      expect(instance2).toBe(PosSdk.getInstance());
    });

    it('deve permitir reinicialização após destroy', () => {
      const instance1 = PosSdk.init(PosSdkAdministrator.REDE);
      PosSdk.destroy();
      const instance2 = PosSdk.init(PosSdkAdministrator.REDE);

      expect(instance1).not.toBe(instance2);
      expect(instance2).toBeInstanceOf(PosSdkInstance);
    });
  });

  describe('getInstance', () => {
    it('deve retornar a instância após init', () => {
      const initInstance = PosSdk.init(PosSdkAdministrator.REDE);
      const getInstance = PosSdk.getInstance();

      expect(getInstance).toBe(initInstance);
    });

    it('deve lançar erro quando getInstance é chamado sem init', () => {
      expect(() => PosSdk.getInstance()).toThrow(
        'PosSdk não foi inicializado. Chame PosSdk.init() primeiro.'
      );
    });

    it('deve lançar erro após destroy', () => {
      PosSdk.init(PosSdkAdministrator.REDE);
      PosSdk.destroy();

      expect(() => PosSdk.getInstance()).toThrow(
        'PosSdk não foi inicializado. Chame PosSdk.init() primeiro.'
      );
    });
  });

  describe('destroy', () => {
    it('deve limpar a instância', () => {
      PosSdk.init(PosSdkAdministrator.REDE);
      PosSdk.destroy();

      expect(() => PosSdk.getInstance()).toThrow();
    });

    it('não deve lançar erro quando chamado múltiplas vezes', () => {
      PosSdk.init(PosSdkAdministrator.REDE);

      expect(() => {
        PosSdk.destroy();
        PosSdk.destroy();
        PosSdk.destroy();
      }).not.toThrow();
    });

    it('não deve lançar erro quando chamado sem init', () => {
      expect(() => PosSdk.destroy()).not.toThrow();
    });
  });

  describe('PosSdkInstance', () => {
    let instance: PosSdkInstance;

    beforeEach(() => {
      instance = PosSdk.init(PosSdkAdministrator.REDE);
    });

    describe('getAdministrator', () => {
      it('deve retornar a administradora configurada', () => {
        expect(instance.getAdministrator()).toBe(PosSdkAdministrator.REDE);
      });
    });

    describe('getAllCapabilities', () => {
      it('deve retornar as capabilities de todos os módulos', async () => {
        const capabilities = await instance.getAllCapabilities();

        expect(capabilities).toHaveProperty('tef');
        expect(capabilities).toHaveProperty('printer');
        expect(capabilities).toHaveProperty('scanner');
        expect(capabilities).toHaveProperty('administrator');
        expect(capabilities.administrator).toBe(PosSdkAdministrator.REDE);
        expect(Array.isArray(capabilities.tef)).toBe(true);
        expect(Array.isArray(capabilities.printer)).toBe(true);
        expect(Array.isArray(capabilities.scanner)).toBe(true);
      });
    });

    describe('createAdapters', () => {
      it('deve lançar erro para administradora não suportada', () => {
        expect(
          () => new PosSdkInstance({ administrator: 'INVALID' as any })
        ).toThrow('Administradora não suportada: INVALID');
      });
    });
  });
});
