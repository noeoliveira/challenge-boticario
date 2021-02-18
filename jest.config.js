const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

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

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],

  preset: "ts-jest",

  setupFiles: ["./jest.setup.ts"],

  testEnvironment: "node",

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
