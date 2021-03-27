import { gql } from "@apollo/client";

// Only query used fields
export const fetchPokemonListQuery = gql`
  query pokemons($limit: Int = 2000, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        name
        image
        owned @client
      }
    }
  }
`;

// Only query used fields
export const fetchPokemonDetails = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      height
      id
      moves {
        move {
          url
          name
        }
      }
      name
      sprites {
        front_default
      }
      stats {
        base_stat
        effort
        stat {
          url
          name
        }
      }
      types {
        slot
        type {
          url
          name
        }
      }
      weight
      message
    }
  }
`;
