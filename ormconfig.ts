import { ConnectionOptions } from "typeorm";
import { join } from "path";
import { env } from "@shared";

const config: ConnectionOptions = {
  type: "sqlite",
  database: env.NODE_ENV === "test" ? ":memory:" : "database.sqlite",
  logging: env.NODE_ENV !== "test",
  migrationsRun: true,
  entities: [join(__dirname, "src/infra/database/entity/**/*.[tj]s")],
  migrations: [join(__dirname, "src/infra/database/migration/**/*.[tj]s")],
  subscribers: [join(__dirname, "src/infra/database/subscriber/**/*.[tj]s")],
  cli: {
    entitiesDir: "src/infra/database/entity",
    migrationsDir: "src/infra/database/migration",
    subscribersDir: "src/infra/database/subscriber",
  },
};

export default config;
