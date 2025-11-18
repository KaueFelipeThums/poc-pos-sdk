import type { IPrinterModule } from '@/domain/contracts/IPrinterModule';
import type { IScannerModule } from '@/domain/contracts/IScannerModule';
import type { ITefModule } from '@/domain/contracts/ITefModule';
import type { PaymentRequest } from '@/domain/entities/PaymentRequest';
import type { PaymentResponse } from '@/domain/entities/PaymentResponse';
import type { PrinterResponse } from '@/domain/entities/PrinterResponse';
import type { ScannerResponse } from '@/domain/entities/ScannerResponse';
import { PaymentStatus } from '@/domain/enums/PaymentStatus';
import { PrinterCapabilities } from '@/domain/enums/PrinterCapabilities';
import { PrinterStatus } from '@/domain/enums/PrinterStatus';
import { ScannerCapabilities } from '@/domain/enums/ScannerCapabilities';
import { ScannerStatus } from '@/domain/enums/ScannerStatus';
import { TefCapabilities } from '@/domain/enums/TefCapabilities';

export class MockTefAdapter implements ITefModule {
  async payment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      status: PaymentStatus.SUCCESS,
      message: 'Pagamento realizado com sucesso',
      data: {
        authorizationCode: 'mock-auth-code',
        flag: 'VISA',
        nsu: 'mock-nsu',
        amount: request.value,
        cv: 'mock-cv',
        cnpj: '12345678901234',
        receipt: {
          customerCopy: 'Via do cliente',
          merchantCopy: 'Via do estabelecimento',
        },
        extras: null,
      },
    } as PaymentResponse;
  }

  getCapabilities(): TefCapabilities[] {
    return [TefCapabilities.PAYMENT];
  }
}

export class MockPrinterAdapter implements IPrinterModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async printImageBase64(_base64Image: string): Promise<PrinterResponse> {
    return {
      status: PrinterStatus.SUCCESS,
      message: 'Impressão realizada com sucesso',
      data: null,
    } as PrinterResponse;
  }

  getCapabilities(): PrinterCapabilities[] {
    return [PrinterCapabilities.PRINT_BASE64_IMAGE];
  }
}

export class MockScannerAdapter implements IScannerModule {
  async scan(): Promise<ScannerResponse> {
    return {
      status: ScannerStatus.SUCCESS,
      message: 'Código escaneado com sucesso',
      data: 'mock-scanned-code',
    };
  }

  getCapabilities(): ScannerCapabilities[] {
    return [ScannerCapabilities.SCAN];
  }
}

export class MockTefAdapterWithError implements ITefModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async payment(_request: PaymentRequest): Promise<PaymentResponse> {
    return {
      status: PaymentStatus.FAILED,
      message: 'Erro ao processar pagamento',
      data: null,
    } as PaymentResponse;
  }

  getCapabilities(): TefCapabilities[] {
    return [];
  }
}

export class MockPrinterAdapterWithError implements IPrinterModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async printImageBase64(_base64Image: string): Promise<PrinterResponse> {
    return {
      status: PrinterStatus.UNKNOWN_ERROR,
      message: 'Erro ao imprimir',
      data: null,
    } as PrinterResponse;
  }

  getCapabilities(): PrinterCapabilities[] {
    return [];
  }
}

export class MockScannerAdapterWithError implements IScannerModule {
  async scan(): Promise<ScannerResponse> {
    return {
      status: ScannerStatus.UNKNOWN_ERROR,
      message: 'Erro ao escanear',
      data: null,
    };
  }

  getCapabilities(): ScannerCapabilities[] {
    return [];
  }
}
