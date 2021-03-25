import React, { createContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Localbase from "localbase";

let db = new Localbase("db");
db.config.debug = false;

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      PokemonItem: {
        fields: {
          owned: {
            read: () => {
              return 10;
            },
          },
        },
      },
    },
  }),
});

export const DefaultContext = createContext();

export const DefaultContextProvider = (props) => {
  return (
    <DefaultContext.Provider value={{ db }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </DefaultContext.Provider>
  );
};
