import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import { defineConfig } from "eslint/config";
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/android/**',
      '**/ios/**',
      '**/build/**',
      '**/.eslintrc.js',
      '**/metro.config.js',
      '**/babel.config.js',
      '**/.prettierrc.js',
      '**/jest.config.js',
      '**/react-native.config.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      globals: {
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
      'react-hooks': reactHooks,
      prettier,
      import: eslintPluginImport,
      '@typescript-eslint': tseslint,
    },
    settings: {
      react: { version: 'detect' },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
    rules: {
      // React Native
      'react-native/split-platform-components': 'off',
      'react-native/no-unused-styles': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/no-inline-styles': 'warn',

      // React
      'react/no-unescaped-entities': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',

      // React Hooks
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Import
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            { pattern: 'components', group: 'internal' },
            { pattern: 'screens', group: 'internal' },
            { pattern: 'common', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Prettier
      'prettier/prettier': ['error'],
    },
  },
  {
    files: ['**/__tests__/**/*.{ts,tsx,js,jsx}', '**/*.test.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest, // 👈 habilita 'it', 'describe', etc.
      },
    },
  }
]);
