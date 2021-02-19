module.exports = {
  clearMocks: true,

  coveragePathIgnorePatterns: [
    "node_modules",
    "__tests__",
    "database/migration",
    "<rootDir>/dist",
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageReporters: ["text-summary", "lcov"],

  preset: "ts-jest",

  setupFiles: ["./jest.setup.ts"],

  testEnvironment: "node",

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
