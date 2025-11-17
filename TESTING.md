# Testes do POS SDK

Este documento descreve a estrutura de testes e como executá-los.

## Estrutura de Testes

O projeto possui testes unitários e de integração organizados da seguinte forma:

```
src/__tests__/
├── __mocks__/              # Mocks reutilizáveis
│   ├── adapters.mock.ts    # Mocks dos adaptadores (Tef, Printer, Scanner)
│   ├── react-native.ts     # Mock do react-native
│   └── rede-adapters.mock.ts # Configuração de mocks para adaptadores Rede
├── unit/                   # Testes unitários
│   ├── pos-sdk.test.ts     # Testes da classe principal PosSdk
│   ├── tef-module.test.ts  # Testes do módulo TEF
│   ├── printer-module.test.ts # Testes do módulo de impressão
│   └── scanner-module.test.ts # Testes do módulo de scanner
├── integration/            # Testes de integração
│   └── pos-sdk-integration.test.ts # Testes de fluxos completos
├── index.test.tsx          # Testes das exportações públicas
└── setup.ts                # Configuração global dos testes
```

## Tipos de Testes

### Testes Unitários

Os testes unitários verificam o comportamento individual de cada módulo:

- **PosSdk**: Testa o padrão singleton, inicialização e gerenciamento de instâncias
- **TefModule**: Testa operações de pagamento e capabilities
- **PrinterModule**: Testa impressão de imagens base64 e validações
- **ScannerModule**: Testa escaneamento de códigos

### Testes de Integração

Os testes de integração verificam fluxos completos:

- Fluxo completo de pagamento com impressão de recibo
- Operações em sequência e paralelo
- Tratamento de erros integrado
- Validação de capabilities

## Executando os Testes

### Executar todos os testes

```bash
yarn test
```

### Executar testes em modo watch

```bash
yarn test --watch
```

### Executar testes com cobertura detalhada

```bash
yarn test --coverage --verbose
```

### Executar um arquivo de teste específico

```bash
yarn test src/__tests__/unit/tef-module.test.ts
```

### Executar testes por padrão

```bash
yarn test --testNamePattern="payment"
```

## Cobertura de Código

A cobertura de código está configurada com os seguintes thresholds mínimos:

- **Statements**: 65%
- **Branches**: 65%
- **Functions**: 70%
- **Lines**: 65%

Os relatórios de cobertura são gerados na pasta `coverage/` após a execução dos testes.

### Visualizar relatório de cobertura

Após executar os testes com `--coverage`, abra o arquivo:

```bash
open coverage/lcov-report/index.html
```

## Mocks

Os testes utilizam mocks para simular o comportamento dos adaptadores nativos:

### MockTefAdapter
Simula operações de pagamento bem-sucedidas

### MockPrinterAdapter
Simula impressão de imagens base64

### MockScannerAdapter
Simula escaneamento de códigos

### Mocks com Erro
Existem também versões com erro de cada adapter para testar cenários de falha:
- `MockTefAdapterWithError`
- `MockPrinterAdapterWithError`
- `MockScannerAdapterWithError`

## Comandos Úteis

```bash
# Executar testes e gerar cobertura
yarn test --coverage

# Executar testes de um tipo específico
yarn test unit
yarn test integration

# Executar testes em modo debug
node --inspect-brk node_modules/.bin/jest --runInBand

# Limpar cache do Jest
yarn test --clearCache
```

## Boas Práticas

1. **Sempre limpe o estado**: Use `beforeEach` e `afterEach` para garantir isolamento entre testes
2. **Teste cenários de erro**: Não teste apenas o caminho feliz
3. **Use mocks apropriados**: Evite dependências de NativeModules reais nos testes
4. **Mantenha testes independentes**: Cada teste deve poder rodar isoladamente
5. **Nomes descritivos**: Use nomes que descrevem claramente o que está sendo testado

## Arquitetura de Testes

Os testes seguem o padrão AAA (Arrange-Act-Assert):

```typescript
it('deve processar pagamento com sucesso', async () => {
  // Arrange: Preparar dados de teste
  const paymentRequest = { /* ... */ };

  // Act: Executar a ação
  const response = await tefModule.payment(paymentRequest);

  // Assert: Verificar o resultado
  expect(response.status).toBe(PaymentStatus.SUCCESS);
});
```

## Contribuindo com Testes

Ao adicionar novos recursos, certifique-se de:

1. Criar testes unitários para a nova funcionalidade
2. Adicionar testes de integração se a funcionalidade afetar múltiplos módulos
3. Manter a cobertura de código acima dos thresholds estabelecidos
4. Atualizar esta documentação se necessário
