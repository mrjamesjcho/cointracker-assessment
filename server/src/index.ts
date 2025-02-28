import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import resolvers from "./resolvers.js";

BigInt.prototype["toJSON"] = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Address {
  id: ID!
  address: String!
  Transactions: [Transaction!]
}

type Transaction {
  id: ID!
  txid: String!
  txIndex: BigInt!
  blockHeight: Int!
  blockIndex: BigInt
  time: DateTime!
  fee: Int!
  size: Int!
  weight: Int!
  lockTime: Int!
  doubleSpend: Boolean!
  Inputs: [Input!]
  Outputs: [Output!]
  Address: Address!
}

type Input {
  id: ID!
  address: String!
  value: BigInt!
  prevTxIndex: BigInt!
  n: Int!
  Transaction: Transaction!
}

type Output {
  id: ID!
  address: String!
  value: BigInt!
  spent: Boolean!
  n: Int!
  Transaction: Transaction!
}

scalar BigInt
scalar DateTime

type Query {
  getAddress(addressId: String!): Address
  getAllAddresses: [Address!]
  getTransactions(addressId: String!): [Transaction!]
}

type Mutation {
  addAddress(address: String!): Address
  removeAddress(addressId: String!): Address
  fetchAndAddTransactions(addressId: String!, address: String!): [Transaction!]
}
`;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server)
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀  Server ready at: http://localhost:4000/graphql`);
