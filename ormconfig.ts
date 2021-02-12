import { ConnectionOptions } from "typeorm";
import { join } from "path";

const config: ConnectionOptions = {
  type: "sqlite",
  database: "database.sqlite",
  logging: true,
  migrationsRun: true,
  entities: [join(__dirname, "src/Infra/database/entity/**/*.ts")],
  migrations: [join(__dirname, "src/Infra/database/migration/**/*.ts")],
  subscribers: [join(__dirname, "src/Infra/database/subscriber/**/*.ts")],
  cli: {
    entitiesDir: "src/Infra/database/entity",
    migrationsDir: "src/Infra/database/migration",
    subscribersDir: "src/Infra/database/subscriber",
  },
};

export default config;
