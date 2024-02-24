import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function main() {
  const app = express();
  const port = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query { 
            hello: String!
            say(name: String!): String!
        }
        type Mutation { 
          createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean!
        }
    `,
    resolvers: {
      Query: {
        hello: () => "graphql server",
        say: (_, { name }: { name: string }) => `Hello, ${name}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random",
            },
          });
          return true;
        },
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ success: true });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();
