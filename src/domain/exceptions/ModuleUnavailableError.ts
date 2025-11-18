export class ModuleUnavailableError extends Error {
  constructor(moduleName: string) {
    super(`${moduleName} não está disponível.`);
    this.name = 'ModuleUnavailableError';
  }
}
