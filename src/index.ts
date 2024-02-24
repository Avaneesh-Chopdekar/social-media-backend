import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

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
    `,
    resolvers: {
      Query: {
        hello: () => "graphql server",
        say: (_, { name }: { name: string }) => `Hello, ${name}`,
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
