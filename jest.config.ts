module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
