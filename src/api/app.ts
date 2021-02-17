import express, { Application } from "express";
import {
  Action,
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useExpressServer,
} from "routing-controllers";
import * as swaggerUiExpress from "swagger-ui-express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage } from "class-transformer/storage";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import { controllers } from "./controllers";
import { middlewares } from "./middlewares";

import { PassportAuth } from "./Auth/passport";
import { PassportStatic } from "passport";
class App {
  private expressApp!: Application;
  private passport!: PassportStatic;
  public server!: Application;

  private readonly routingControllersOptions: RoutingControllersOptions = {
    routePrefix: "/api",
    controllers,
    middlewares,
    classTransformer: true,
    defaultErrorHandler: false,
    authorizationChecker: (action: Action) =>
      new Promise<boolean>((resolve, reject) => {
        this.passport.authenticate("jwt", (err, user) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return resolve(false);
          }
          action.request.user = user;
          return resolve(true);
        })(action.request, action.response, action.next);
      }),
    currentUserChecker: (action: Action) => action.request.user,
  };

  public init() {
    this.expressApp = express();
    this.passport = new PassportAuth().PassportAuth;

    this.middlewares();

    this.server = useExpressServer(
      this.expressApp,
      this.routingControllersOptions
    );
    this.addSwagger();

    return this.server;
  }

  private middlewares() {
    this.expressApp.use(compression());
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
    this.expressApp.use(this.passport.initialize());
  }

  private addSwagger() {
    const schemas = validationMetadatasToSchemas({
      // classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    const spec = routingControllersToSpec(
      getMetadataArgsStorage(),
      this.routingControllersOptions,
      {
        components: {
          schemas,
          securitySchemes: {
            Authorization: {
              description: "API Token",
              type: "http",
              name: "Authorization",
              scheme: "bearer",
              bearerFormat: "JWT",
              in: "header",
            },
          },
        },
        info: {
          title: "Challenge Boticário",
          version: "1.0.0",
          contact: {
            name: "Noé Oliveira",
            url: "https://github.com/noeoliveira/projeto-grupo-boticario",
          },
        },
      }
    );

    this.server.use(
      "/api-docs",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(spec)
    );
  }
}

export default new App();
