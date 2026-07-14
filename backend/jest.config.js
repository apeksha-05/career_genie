module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['./tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
};
