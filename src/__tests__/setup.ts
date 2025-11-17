// Setup global para os testes
// Configurações adicionais podem ser adicionadas aqui

// Configurar timeout padrão para testes assíncronos
jest.setTimeout(10000);

// Limpar mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Importar mocks dos adaptadores Rede
import './__mocks__/rede-adapters.mock';
