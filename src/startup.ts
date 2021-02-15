import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import "@infra/IoC/RootInjectionDependency";
import Server from "@api/app";
import { env } from "@shared";
import { connectDatabase } from "./connectDatabase";

async function main() {
  await connectDatabase();
  Server.listen(env.SERVER_PORT || 3000, () => console.log("Server started"));
}

(async () => await main())();
