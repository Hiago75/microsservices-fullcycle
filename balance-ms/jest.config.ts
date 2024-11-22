/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/__tests__'],
    testRegex: '(/__tests__/.*\\.test\\.tsx?$|\\.(test)\\.tsx?$)',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/database/repositories/prisma/prisma.singleton.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '^@infra/(.*)$': '<rootDir>/src/infra/$1',
      '^@domain/(.*)$': '<rootDir>/src/domain/$1',
      '^@application/(.*)$': '<rootDir>/src/application/$1'
    },
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
  }