module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  testTimeout: 5000
}
