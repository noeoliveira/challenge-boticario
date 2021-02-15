import express, { Application } from "express";
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useExpressServer,
} from "routing-controllers";
import * as swaggerUiExpress from "swagger-ui-express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage } from "class-transformer/storage";

import { controllers } from "./controllers";

import compression from "compression";
import helmet from "helmet";
import cors from "cors";

class App {
  private expressApp: Application;
  public server: Application;

  private routingControllersOptions: RoutingControllersOptions = {
    routePrefix: "/api",
    controllers,
    middlewares: [compression(), helmet()],
    classTransformer: true,
  };

  constructor() {
    this.expressApp = express();
    this.middlewares();

    this.server = useExpressServer(
      this.expressApp,
      this.routingControllersOptions
    );
    this.addSwagger();
  }

  private middlewares() {
    this.expressApp.use(compression());
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
  }

  private addSwagger() {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    const spec = routingControllersToSpec(
      getMetadataArgsStorage(),
      this.routingControllersOptions,
      {
        components: { schemas },
      }
    );

    this.server.use(
      "/api-docs",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(spec)
    );
  }
}

export default new App().server;
