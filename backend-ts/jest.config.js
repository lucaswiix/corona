module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   '^src$',
  //   '/old_visit/',
  //   '/node_modules/',
  // ],

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: "<rootDir>/src/test/setup.js",
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.js"],

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  globals: {
    NODE_ENV: "test",
    SQL_PORT: "3307",
    SQL_USER: "thor",
    SQL_DATABASE: "root",
    SQL_PASSWORD: "root",
    SQL_HOST: "localhost",
    "ts-jest": {
      babelConfig: true
    }
  },

  // Reset the module registry before running each individual test
  resetModules: true,

  // The root directory that Jest should scan for tests and modules within
  roots: ["<rootDir>/src"],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["<rootDir>/src/test/jestSetup.ts"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["^src$", "^dist$", "^build$", "/node_modules/"],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost",

  transform: {
    "^.+\\.ts(|x)?$": "ts-jest"
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["/node_modules/"],

  // Indicates whether each individual test should be reported during the run
  verbose: false
};
