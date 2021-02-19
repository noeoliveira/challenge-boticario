import dotenv from "dotenv";
dotenv.config({ path: "./.env.test" });

import "reflect-metadata";
import "./src/infrastructure/IoC/RootInjectionDependency";
