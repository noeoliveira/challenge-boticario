const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/application/**/*.ts"],

  coverageDirectory: "coverage",

  coverageReporters: ["text-summary", "lcov"],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),

  preset: "ts-jest",

  setupFiles: ["./jest.setup.ts"],

  testEnvironment: "node",

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};
