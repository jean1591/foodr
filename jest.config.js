module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@entities/(.*)': '<rootDir>/src/entities/$1',
    '@frameworks/(.*)': '<rootDir>/src/frameworks/$1',
    '@interface-adapters/(.*)': '<rootDir>/src/interface-adapters/$1',
    '@use-cases/(.*)': '<rootDir>/src/use-cases/$1',
  },
  collectCoverageFrom: ['src/resources/**/*.ts'],
  modulePathIgnorePatterns: ['<rootDir>/src/scripts'],
  coveragePathIgnorePatterns: [
    '.dto.ts',
    '.entity.ts',
    '.module.ts',
    '.call.ts',
  ],
};
