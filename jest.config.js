// jest.config.js
module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // Set up the environment for your tests
    testEnvironment: 'jsdom',
  
    // Setup files to run before each test
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
    // Specify patterns for test files
    testMatch: [
      '**/src/**/*.test.js',
      '**/src/**/*.spec.js',
    ],
  
    // Transform files before testing
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  
    // Ignore transformation of node_modules
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
    // Configure module name mappings
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  
    // Collect coverage information
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js', // Exclude files from coverage
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  
    // Print coverage information in the console
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  
    // Configure Jest reporters
    reporters: ['default', '@learn-co-curriculum/jest-learn-reporter'],
  };