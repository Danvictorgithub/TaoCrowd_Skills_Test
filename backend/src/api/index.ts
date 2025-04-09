import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";

import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server before setting up routes
const setupGraphQL = async () => {
  await server.start();
  router.use("/graphql", cors<cors.CorsRequest>(), expressMiddleware(server));
};

setupGraphQL();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Welcome to TaoCrowd Skills Test API by Dan Victor B. Lofranco",
  });
});

export default router;
