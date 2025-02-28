"use client";

import { HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { createClient } from "graphql-ws";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetchOptions: {
      cache: "no-cache",
      mode: "cors",
    },
    useGETForQueries: true,
    credentials: "include",
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/",
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
