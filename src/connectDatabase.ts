import { createConnection } from "typeorm";
import configTypeORM from "../ormconfig";

// configTypeORM
export async function connectDatabase(config = configTypeORM) {
  try {
    const connection = await createConnection(config);
    console.log("Connected Database");
    return connection;
  } catch (error) {
    throw new Error(error);
  }
}
