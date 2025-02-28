import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Address {
  id: ID!
  address: String!
  transactions: [Transaction!]
  inputs: [Input!]
  outputs: [Output!]
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
  inputs: [Input!]
  outputs: [Output!]
  addresses: [Address!]
}

type Input {
  id: ID!
  address: String!
  value: BigInt!
  prevTxIndex: BigInt!
  n: Int!
  transaction: Transaction!
}

type Output {
  id: ID!
  address: String!
  value: BigInt!
  spent: Boolean!
  n: Int!
  transaction: Transaction!
}

scalar BigInt
scalar DateTime

type Query {
  getAddress(): [Address!]
  getAddress(address: String!): Address
  getTransactions(address: String!): [Transaction!]
}

type Mutation {
  addAddress(address: String!): Address
  removeAddress(address: String!): Address
}
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
