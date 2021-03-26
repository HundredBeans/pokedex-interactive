import React from "react";
// import { DefaultContext } from "../context/DefaultContext";
import { useQuery } from "@apollo/client";
import { fetchPokemonListQuery } from "../helpers/query";
import Loader from "../components/Loader";
import ListCard from "../components/ListCard";
import { GridItem, SimpleGrid, Container } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function PokemonList() {
  const history = useHistory();
  const { error, data } = useQuery(fetchPokemonListQuery, {
    variables: {
      limit: 20,
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
  });
  if (!data) {
    if (error) {
      return <h1>error..</h1>;
    }
    return <Loader loadingText="Fetching Data" />;
  }
  return (
    <Container maxWidth="container.md">
      <SimpleGrid minChildWidth="150px" spacing="40px" py={7}>
        {data.pokemons.results.map((item) => (
          <GridItem key={item.name}>
            <ListCard
              name={item.name}
              imageSrc={item.image}
              owned={item.owned}
              onClickCard={() => history.push(`/pokemons/${item.name}`)}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default PokemonList;
