import "reflect-metadata";
import "./Infra/IoC/RootInjectionDependency";
import { createConnection } from "typeorm";
import Server from "./api/app";

async function connectDatabase() {
  try {
    await createConnection();
    console.log("Connected Database");
  } catch (error) {
    return console.log(error);
  }
}

async function main() {
  await connectDatabase();
  Server.listen(3000, () => console.log("Server started"));
}

(async () => await main())();
