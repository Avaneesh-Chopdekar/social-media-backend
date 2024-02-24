import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import Users from "./user";

export default async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
        type Query { 
          ${Users.queries}
        }
        type Mutation { 
          ${Users.mutations}
        }
      `,
    resolvers: {
      Query: {
        ...Users.resolvers.queries,
      },
      Mutation: {
        ...Users.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
}
