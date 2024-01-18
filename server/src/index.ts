import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { weatherTypeDefs } from "./graphql/typesdefs/weatherTypeDefs.js";
import { weatherResolvers } from "./graphql/resolvers/weatherResolvers.js";

dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs: [weatherTypeDefs],
  resolvers: [weatherResolvers],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

const PORT = process.env.PORT;
console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
