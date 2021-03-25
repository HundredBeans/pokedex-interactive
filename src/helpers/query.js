import { gql } from "@apollo/client";

export const fetchPokemonListQuery = gql`
  query pokemons($limit: Int = 2000, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      status
      message
      params
      results {
        url
        name
        image
        owned @client
      }
    }
  }
`;

export const fetchPokemonDetails = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          url
          name
        }
        is_hidden
        slot
      }
      base_experience
      forms {
        url
        name
      }
      game_indices {
        game_index
      }
      height
      held_items {
        item {
          url
          name
        }
      }
      id
      is_default
      location_area_encounters
      moves {
        move {
          url
          name
        }
      }
      name
      order
      species {
        url
        name
      }
      sprites {
        back_default
        back_shiny
        back_female
        back_shiny_female
        front_default
        front_shiny
        front_female
        front_shiny_female
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
      status
      message
    }
  }
`;
