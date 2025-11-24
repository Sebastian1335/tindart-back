/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  // Archivos donde buscar tests
  testMatch: ['**/tests/**/*.test.ts'],

  // Ignorar la carpeta dist
  modulePathIgnorePatterns: ['<rootDir>/dist/'],

  // Transformar TypeScript con ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  // Para evitar problemas con módulos ESM
  extensionsToTreatAsEsm: ['.ts'],
  // Setup file to run after the test framework is installed
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
};
