import { ConnectionOptions } from "typeorm";
import { join } from "path";
import { env } from "./src/shared";

const config: ConnectionOptions = {
  type: "sqlite",
  database: env.NODE_ENV === "test" ? ":memory:" : "database.sqlite",
  logging: env.NODE_ENV !== "test",
  migrationsRun: true,
  entities: [join(__dirname, "src/infrastructure/database/entity/**/*.[tj]s")],
  migrations: [
    join(__dirname, "src/infrastructure/database/migration/**/*.[tj]s"),
  ],
  subscribers: [
    join(__dirname, "src/infrastructure/database/subscriber/**/*.[tj]s"),
  ],
  cli: {
    entitiesDir: "src/infrastructure/database/entity",
    migrationsDir: "src/infrastructure/database/migration",
    subscribersDir: "src/infrastructure/database/subscriber",
  },
};

export default config;
