jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});

import './__mocks__/rede-adapters.mock';
