import { InMemoryCache, makeVar, ApolloClient } from "@apollo/client";
import { fetchPokemonListQuery } from "./query";
import { db } from "./db";

// handle async read function https://github.com/apollographql/apollo-client/issues/6852#issuecomment-687091462
const asyncRead = (fn, query) => {
  return (_, args) => {
    if (!args.storage.var) {
      args.storage.var = makeVar(undefined);
      fn(_, args).then((data) => {
        args.storage.var(data);
        args.cache.writeQuery({
          query,
          data: { [args.fieldName]: data },
        });
      });
    }
    return args.storage.var();
  };
};

export const cache = new InMemoryCache({
  typePolicies: {
    PokemonItem: {
      fields: {
        owned: {
          read: asyncRead(async (existing, { readField }) => {
            const pokemonName = readField("name");
            const caughtPokemons = await db.collection("caughtPokemon").get();
            let count = 0;
            caughtPokemons.forEach((item) => {
              if (item.pokemonName === pokemonName) {
                count += 1;
              }
            });
            return count;
          }, fetchPokemonListQuery),
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: cache,
});
