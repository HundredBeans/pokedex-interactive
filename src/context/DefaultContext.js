import React from "react";
import Loader from "../components/Loader";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "../helpers/cache";

export const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: cache,
});

export const DefaultContextProvider = (props) => {
  if (!client) {
    return <Loader loadingText={"Initializing app..."} />;
  }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
