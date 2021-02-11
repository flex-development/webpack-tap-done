const path = require('path')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@fixtures/(.*)$': '<rootDir>/__tests__/fixtures/$1',
    '^@test-utils': '<rootDir>/__tests__/utils.ts',
    '^@webpack-tap-done': '<rootDir>/src/index.ts',
    '^@webpack-tap-done/(.*)$': '<rootDir>/src/$1'
  },
  prettierPath: path.join(__dirname, 'node_modules', 'prettier'),
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'dist/',
    'fixtures/',
    'node_modules/',
    '__tests__/utils.ts',
    '(.*).d.ts'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  verbose: true
}
