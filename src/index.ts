import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

async function main() {
  const app = express();
  const port = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ success: true });
  });

  const gqlServer = await createApolloGraphqlServer();
  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const token = req.headers["token"];

        try {
          const user = UserService.decodeJwtToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();
