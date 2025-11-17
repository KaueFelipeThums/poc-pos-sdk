# Guia de Instalação e Publicação - POS SDK

## 📦 Instalação da Biblioteca

### Opção 1: Instalação Direta do GitHub (Recomendado para desenvolvimento)

Você pode instalar a biblioteca diretamente do GitHub sem precisar publicar no NPM:

```bash
# Instalar da branch main
yarn add https://github.com/KaueFelipeThums/poc-pos-sdk.git

# Ou usando o formato curto
yarn add KaueFelipeThums/poc-pos-sdk

# Instalar de uma branch específica
yarn add KaueFelipeThums/poc-pos-sdk#develop

# Instalar de uma tag/release
yarn add KaueFelipeThums/poc-pos-sdk#v0.1.0

# Instalar de um commit específico
yarn add KaueFelipeThums/poc-pos-sdk#abc1234
```

**Vantagens:**
- ✅ Não precisa publicar no NPM
- ✅ Ideal para desenvolvimento e testes
- ✅ Funciona em projetos privados
- ✅ Controle de versão via tags/branches

**Desvantagens:**
- ⚠️ Requer acesso ao repositório GitHub
- ⚠️ Não aparece no registry do NPM

### Opção 2: Instalação via NPM (Quando Publicado)

Após publicar no NPM, será possível instalar como qualquer pacote público:

```bash
yarn add poc-pos-sdk
# ou
npm install poc-pos-sdk
```

## 🚀 Como a Instalação do GitHub Funciona

### O que acontece quando alguém instala via GitHub:

1. **Yarn/NPM clona o repositório**
2. **Executa o script `prepare`** (definido no `package.json`)
   ```json
   "prepare": "bob build"
   ```
3. **Gera a pasta `lib/`** com o código compilado
4. **Instala as dependências** necessárias
5. **Biblioteca fica pronta** para uso

### ⚠️ Importante sobre a pasta `lib/`

A pasta `lib/` está no `.gitignore` (e deve continuar assim), mas **isso não é um problema** porque:

- O script `prepare` é executado automaticamente após a instalação
- O `react-native-builder-bob` compila o TypeScript e gera os arquivos necessários
- Usuários não precisam de acesso aos arquivos compilados no git

## 📋 Configuração Atual (✅ Pronto para Uso)

Sua biblioteca já está configurada corretamente:

### ✅ package.json está configurado

```json
{
  "name": "poc-pos-sdk",
  "version": "0.1.0",
  "main": "./lib/module/index.js",
  "types": "./lib/typescript/src/index.d.ts",
  "files": [
    "src",
    "lib",
    "android",
    "!**/__tests__",
    "!**/__mocks__"
  ],
  "scripts": {
    "prepare": "bob build"
  }
}
```

### ✅ O que é incluído na instalação:

- ✅ Código fonte (`src/`)
- ✅ Arquivos compilados (`lib/` - gerados no `prepare`)
- ✅ Código nativo Android (`android/`)
- ✅ Configurações necessárias
- ❌ Testes excluídos
- ❌ Mocks excluídos

## 🔧 Testando a Instalação Localmente

### Método 1: Usar em outro projeto local

```bash
# No projeto que vai usar a lib
yarn add ../caminho/para/poc-pos-sdk

# Ou usando link
cd /caminho/para/poc-pos-sdk
yarn link

cd /caminho/para/seu-projeto
yarn link poc-pos-sdk
```

### Método 2: Instalar do GitHub em outro projeto

```bash
# Faça commit e push das mudanças
cd /caminho/para/poc-pos-sdk
git add .
git commit -m "feat: configuração completa da lib"
git push

# Em outro projeto
yarn add KaueFelipeThums/poc-pos-sdk
```

## 📤 Publicando no NPM (Opcional)

Se quiser disponibilizar no registry público do NPM:

### 1. Criar conta no NPM

```bash
npm login
```

### 2. Verificar se o nome está disponível

```bash
npm search poc-pos-sdk
```

### 3. Publicar

```bash
# Build da biblioteca
yarn prepare

# Publicar
npm publish

# Ou para scoped packages privados
npm publish --access public
```

### 4. Usar versionamento semântico

```bash
# Atualizar versão patch (0.1.0 -> 0.1.1)
npm version patch

# Atualizar versão minor (0.1.0 -> 0.2.0)
npm version minor

# Atualizar versão major (0.1.0 -> 1.0.0)
npm version major

# Publicar nova versão
npm publish
```

## 🏷️ Usando Tags/Releases no GitHub

Para facilitar a instalação de versões específicas:

### Criar uma release

```bash
# Criar e enviar tag
git tag v0.1.0
git push origin v0.1.0

# Ou criar release no GitHub UI
# https://github.com/KaueFelipeThums/poc-pos-sdk/releases/new
```

### Instalar versão específica

```bash
# Instalar versão exata
yarn add KaueFelipeThums/poc-pos-sdk#v0.1.0

# No package.json ficará:
# "poc-pos-sdk": "KaueFelipeThums/poc-pos-sdk#v0.1.0"
```

## 📋 Checklist de Publicação

Antes de marcar uma release como estável:

- [x] Testes passando (55/55 ✅)
- [x] Cobertura adequada (67.64%)
- [x] README.md atualizado
- [x] TypeScript compilando sem erros
- [x] Build funcionando (`yarn prepare`)
- [x] Exemplos de uso documentados
- [ ] CHANGELOG.md criado
- [ ] Versão atualizada no package.json
- [ ] Tag criada no git

## 🎯 Exemplo de Uso Após Instalação

```typescript
// No seu projeto React Native
import { PosSdk, PosSdkAdministrator, PaymentType } from 'poc-pos-sdk';

// Inicializar
const sdk = PosSdk.init(PosSdkAdministrator.REDE);

// Usar
const response = await sdk.tef.payment({
  type: PaymentType.CREDIT,
  value: 10000,
  installments: 1,
  installmentType: InstallmentType.CREDIT_MERCHANT,
  extras: null,
});
```

## 🔍 Verificação

Para verificar se tudo está funcionando:

```bash
# 1. Build local
yarn prepare

# 2. Verificar se lib/ foi criada
ls -la lib/

# 3. Verificar arquivos que serão publicados
npm pack --dry-run

# 4. Rodar testes
yarn test

# 5. Verificar tipos TypeScript
yarn typecheck
```

## 🆘 Troubleshooting

### Erro: "Cannot find module 'poc-pos-sdk'"

```bash
# Reinstalar
rm -rf node_modules yarn.lock
yarn install
```

### Erro no build do Android

```bash
# Limpar cache do gradle
cd android && ./gradlew clean && cd ..

# Rebuild
cd android && ./gradlew build && cd ..
```

### Erro de tipos TypeScript

```bash
# Rebuildar tipos
yarn prepare

# Verificar tipos
yarn typecheck
```

## 📚 Recursos Adicionais

- [Documentação de Testes](./TESTING.md)
- [Resumo de Testes](./TEST_SUMMARY.md)
- [NPM Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
