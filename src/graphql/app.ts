import { ApolloServer, gql } from "apollo-server-express";
import { Application } from "express";
import { buildSchema } from "type-graphql";
class AppGraphql {
  public server!: ApolloServer;

  async init(app: Application) {
    const schema = await buildSchema({
      resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
    });

    this.server = new ApolloServer({
      schema,
    });
    // await this.server.start();
    this.server.applyMiddleware({ app, path: "/graphql" });
  }
}

export default new AppGraphql();
