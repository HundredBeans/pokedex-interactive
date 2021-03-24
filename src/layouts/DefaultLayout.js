import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Navigation from "./Navigation";
import { DefaultContext } from "../context/DefaultContext";

const fetchPokemonList = gql`
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
      }
    }
  }
`;

function DefaultLayout(props) {
  const { loading, error, data } = useQuery(fetchPokemonList);
  const pokemons = useContext(DefaultContext)[0];

  if (data) {
    data.pokemons.results.forEach((item) => pokemons.setItem(item.name, item));
  }

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error....</p>;

  console.log("data", data);

  const headerHeight = "80px";

  return (
    <React.Fragment>
      <Box maxHeight="100vh">
        <Navigation headerHeight={headerHeight} />
        <Box
          paddingTop={`${headerHeight}`}
          height={`calc(100% - ${headerHeight})`}
        >
          {props.children}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default DefaultLayout;
