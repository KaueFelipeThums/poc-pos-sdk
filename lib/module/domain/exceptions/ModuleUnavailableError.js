"use strict";

export class ModuleUnavailableError extends Error {
  constructor(moduleName) {
    super(`${moduleName} não está disponível.`);
    this.name = 'ModuleUnavailableError';
  }
}
//# sourceMappingURL=ModuleUnavailableError.js.map