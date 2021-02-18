import dotenv from "dotenv";
dotenv.config({ path: "./.env.test" });

import "reflect-metadata";
import "@infra/IoC/RootInjectionDependency";
import tsConfigPaths from "tsconfig-paths";
import tsConfig from "./tsconfig.json";

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
