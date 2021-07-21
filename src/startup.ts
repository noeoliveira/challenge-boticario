import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import "./infrastructure/IoC/RootInjectionDependency";
import { env } from "./shared";
import { connectDatabase } from "./connectDatabase";

import Api from "./api/app";
import Graphql from "./graphql/app";
import http from "http";

async function main() {
  await connectDatabase();
  const api = Api.init();
  await Graphql.init(api);

  const server = http.createServer(api);

  server.listen(env.SERVER_PORT || 3000, () => console.log("Server started"));
}

(async () => {
  await main();
})();
