# POS SDK

SDK React Native para integração com terminais POS de diferentes administradoras de pagamento. Implementado com Clean Architecture para máxima extensibilidade e manutenibilidade.

## 🚀 Inicialização

### Configuração Básica

```typescript
import { PosSdk, PosSdkAdministrator } from 'poc-pos-sdk';

// Inicializar o SDK com a administradora desejada
const sdk = PosSdk.init(PosSdkAdministrator.REDE);
```

### Destruir Instância

```typescript
PosSdk.destroy();
```

## 🏦 Administradoras Suportadas

| Administradora | Enum | Status |
|---------------|------|--------|
| Rede | `PosSdkAdministrator.REDE` | ✅ Implementado |

## 💳 Módulo TEF (Transferência Eletrônica de Fundos)

### Realizar Pagamento

```typescript
import {
  PaymentType,
  InstallmentType,
  PaymentStatus
} from 'poc-pos-sdk';

const response = await sdk.tef.payment({
  type: PaymentType.CREDIT,
  value: 10000, // Valor em centavos (R$ 100,00)
  installments: 3,
  installmentType: InstallmentType.CREDIT_MERCHANT,
  extras: {
    // Rede
    redePackageName: 'br.com.sua.aplicacao'
  }
});

if (response.status === PaymentStatus.SUCCESS) {
  console.log('Pagamento aprovado!');
  console.log('NSU:', response.data.nsu);
  console.log('Código de autorização:', response.data.authorizationCode);
}
```

### Tipos de Pagamento Suportados

```typescript
enum PaymentType {
  CASH = 'CASH',              // Dinheiro
  CHECK = 'CHECK',            // Cheque
  CREDIT = 'CREDIT',          // Crédito à vista
  DEBIT = 'DEBIT',            // Débito
  INSTALLMENT = 'INSTALLMENT', // Parcelado
  FOOD_VOUCHER = 'FOOD_VOUCHER',     // Vale alimentação
  MEAL_VOUCHER = 'MEAL_VOUCHER',     // Vale refeição
  GIFT_VOUCHER = 'GIFT_VOUCHER',     // Vale presente
  FUEL_VOUCHER = 'FUEL_VOUCHER',     // Vale combustível
  BANK_SLIP = 'BANK_SLIP',           // Boleto bancário
  BANK_DEPOSIT = 'BANK_DEPOSIT',     // Depósito bancário
  PIX = 'PIX',                       // PIX
  TRANSFER = 'TRANSFER',             // Transferência
  LOYALTY = 'LOYALTY',               // Programa de fidelidade
  NO_PAYMENT = 'NO_PAYMENT',         // Sem pagamento
  DEFERRED_PAYMENT = 'DEFERRED_PAYMENT', // Pagamento diferido
  OTHER = 'OTHER'                    // Outro
}
```

### Tipos de Parcelamento

```typescript
enum InstallmentType {
  CREDIT_MERCHANT = 'CREDIT_MERCHANT', // Parcelado loja
  CREDIT_ISSUER = 'CREDIT_ISSUER'     // Parcelado emissor
}
```

### Status de Pagamento

```typescript
enum PaymentStatus {
  SUCCESS = 'SUCCESS',               // Aprovado
  PENDING = 'PENDING',               // Pendente
  CANCELLED = 'CANCELLED',           // Cancelado
  INVALID_REQUEST = 'INVALID_REQUEST', // Requisição inválida
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'    // Erro desconhecido
}
```

### Obter Capacidades do TEF

```typescript
import { TefCapabilities } from 'poc-pos-sdk';

const capabilities = await sdk.tef.getCapabilities();

// Verifica se suporta pagamento
if (capabilities.includes(TefCapabilities.PAYMENT)) {
  console.log('Terminal suporta pagamento');
}
```

## 🖨️ Módulo Printer (Impressora)

### Imprimir Imagem Base64

```typescript
import { PrinterStatus } from 'poc-pos-sdk';

const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'; // Sua imagem em Base64

const response = await sdk.printer.printImageBase64(base64Image);

if (response.status === PrinterStatus.SUCCESS) {
  console.log('Impressão realizada com sucesso!');
} else {
  console.error('Erro na impressão:', response.message);
}
```

### Status da Impressora

```typescript
enum PrinterStatus {
  SUCCESS = 'SUCCESS',               // Impressão bem-sucedida
  ERROR = 'ERROR',                   // Erro na impressão
  PAPER_OUT = 'PAPER_OUT',           // Sem papel
  PRINTER_BUSY = 'PRINTER_BUSY',     // Impressora ocupada
  PRINTER_OFFLINE = 'PRINTER_OFFLINE' // Impressora offline
}
```

### Obter Capacidades da Impressora

```typescript
import { PrinterCapabilities } from 'poc-pos-sdk';

const capabilities = await sdk.printer.getCapabilities();

if (capabilities.includes(PrinterCapabilities.PRINT_IMAGE)) {
  console.log('Impressora suporta impressão de imagens');
}
```

## 📋 Parâmetros Extras por Administradora

### Rede

#### Parâmetros de Request (Obrigatórios)

```typescript
interface RedePaymentExtras {
  redePackageName: string; // Nome do pacote da aplicação Rede
}
```

**Exemplo:**
```typescript
const response = await sdk.tef.payment({
  type: PaymentType.CREDIT,
  value: 10000,
  installments: 1,
  installmentType: InstallmentType.CREDIT_MERCHANT,
  extras: {
    redePackageName: 'br.com.redecard.meu.app'
  }
});
```

**⚠️ Importante:** O campo `redePackageName` é obrigatório para transações Rede. Ele identifica a aplicação que está fazendo a requisição.

#### Parâmetros de Response

A Rede não retorna parâmetros extras na resposta. Apenas os dados padrão:

```typescript
interface PaymentResponseData {
  authorizationCode: string; // Código de autorização
  flag: string;              // Bandeira do cartão
  nsu: string;              // NSU da transação
  amount: number;           // Valor em centavos
  cv: string;               // Código de verificação
  cnpj: string;             // CNPJ do estabelecimento
  receipt: Receipt | null;  // Recibo (se disponível)
}
```

## 🔍 Obter Todas as Capacidades

```typescript
const allCapabilities = await sdk.getAllCapabilities();

console.log('Capacidades TEF:', allCapabilities.tef);
console.log('Capacidades Impressora:', allCapabilities.printer);
console.log('Administradora:', allCapabilities.administrator);
```

## 📝 Exemplos Completos

### Exemplo 1: Pagamento Simples no Débito

```typescript
import PosSdk, {
  PosSdkAdministrator,
  PaymentType,
  InstallmentType,
  PaymentStatus
} from 'poc-pos-sdk';

async function processarPagamentoDebito() {
  PosSdk.init(PosSdkAdministrator.REDE);

  const sdk = PosSdk.getInstance();

  try {
    const response = await sdk.tef.payment({
      type: PaymentType.DEBIT,
      value: 5000, // R$ 50,00
      installments: 1,
      installmentType: InstallmentType.CREDIT_MERCHANT,
      extras: {
        redePackageName: 'br.com.redecard.meu.app'
      }
    });

    if (response.status === PaymentStatus.SUCCESS) {
      console.log('✅ Pagamento aprovado!');
      console.log('NSU:', response.data?.nsu);
      console.log('Autorização:', response.data?.authorizationCode);
      console.log('Bandeira:', response.data?.flag);
    } else {
      console.error('❌ Pagamento não aprovado:', response.message);
    }
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
  }
}
```

### Exemplo 2: Pagamento Parcelado

```typescript
async function processarPagamentoParcelado() {
  const sdk = PosSdk.getInstance();

  const response = await sdk.tef.payment({
    type: PaymentType.CREDIT,
    value: 30000, // R$ 300,00
    installments: 6,
    installmentType: InstallmentType.CREDIT_ISSUER, // Parcelado emissor
    extras: {
      redePackageName: 'br.com.redecard.meu.app'
    }
  });

  return response;
}
```

### Exemplo 3: Pagamento PIX

```typescript
async function processarPagamentoPix() {
  const sdk = PosSdk.getInstance();

  const response = await sdk.tef.payment({
    type: PaymentType.PIX,
    value: 15000, // R$ 150,00
    installments: 1,
    installmentType: InstallmentType.CREDIT_MERCHANT,
    extras: {
      redePackageName: 'br.com.redecard.meu.app'
    }
  });

  return response;
}
```

### Exemplo 4: Imprimir Comprovante

```typescript
import { PrinterStatus } from 'poc-pos-sdk';

async function imprimirComprovante(comprovanteBase64: string) {
  const sdk = PosSdk.getInstance();

  const response = await sdk.printer.printImageBase64(comprovanteBase64);

  if (response.status === PrinterStatus.SUCCESS) {
    console.log('✅ Comprovante impresso com sucesso!');
  } else if (response.status === PrinterStatus.PAPER_OUT) {
    console.error('❌ Sem papel na impressora!');
  } else {
    console.error('❌ Erro ao imprimir:', response.message);
  }
}
```

## 🏗️ Arquitetura

O SDK foi desenvolvido seguindo os princípios da Clean Architecture:

- **Domain**: Entidades, contratos e regras de negócio
- **Infrastructure**: Adapters para diferentes administradoras e módulos nativos
- **Presentation**: API pública e fachada do SDK

Para mais detalhes, consulte [CLEAN_ARCHITECTURE.md](./CLEAN_ARCHITECTURE.md)

## 🔧 Tratamento de Erros

```typescript
import { PaymentStatus } from 'poc-pos-sdk';

try {
  const response = await sdk.tef.payment(paymentRequest);

  switch (response.status) {
    case PaymentStatus.SUCCESS:
      // Pagamento aprovado
      break;
    case PaymentStatus.CANCELLED:
      // Pagamento cancelado pelo usuário
      break;
    case PaymentStatus.INVALID_REQUEST:
      // Requisição inválida
      console.error(response.message);
      break;
    default:
      // Outros erros
      console.error(response.message);
  }
} catch (error) {
  console.error('Erro ao processar pagamento:', error);
}
```
