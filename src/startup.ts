import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import "./infrastructure/IoC/RootInjectionDependency";
import app from "./api/app";
import { env } from "./shared";
import { connectDatabase } from "./connectDatabase";

async function main() {
  await connectDatabase();
  app.init();
  app.server.listen(env.SERVER_PORT || 3000, () =>
    console.log("Server started")
  );
}

(async () => {
  await main();
})();
