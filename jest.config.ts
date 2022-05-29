module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
