import React, { createContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import localForage from "localforage";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export const DefaultContext = createContext();

export const DefaultContextProvider = (props) => {
  localForage.config({
    driver: localForage.INDEXEDDB,
  });
  let pokemons = localForage.createInstance({
    name: "pokemons",
  });
  let caughtPokemons = localForage.createInstance({
    name: "caughtPokemons",
  });

  return (
    <DefaultContext.Provider value={[pokemons, caughtPokemons]}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </DefaultContext.Provider>
  );
};
