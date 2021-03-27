import React, { useContext } from "react";
// import { DefaultContext } from "../context/DefaultContext";
import { useQuery } from "@apollo/client";
import { fetchPokemonListQuery } from "../helpers/query";
// import Loader from "../components/Loader";
import ListCard from "../components/ListCard";
import { GridItem, SimpleGrid, Container, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import ControlButton from "../components/ControlButton";
import { PaginationContext } from "../context/DefaultContext";
import ErrorAlert from "../components/ErrorAlert";
// import debounce from "lodash.debounce";

function PokemonList() {
  const history = useHistory();
  const { pokemonListPage, setPokemonListPage, pageLimit } = useContext(
    PaginationContext
  );
  const { error, data } = useQuery(fetchPokemonListQuery, {
    variables: {
      limit: pageLimit,
      offset: (pokemonListPage - 1) * pageLimit,
    },
    fetchPolicy: "cache-and-network",
  });
  const maxPage = data ? Math.ceil(data.pokemons.count / pageLimit) : 56;

  // Pagination Function
  const onChangePage = (e) => {
    if (!e) {
      return;
    }
    const pageNumber = parseInt(e);
    if (pageNumber < 1) {
      setPokemonListPage(1);
      return;
    }
    if (pageNumber > maxPage) {
      setPokemonListPage(maxPage);
      return;
    }
    setPokemonListPage(parseInt(e));
  };
  const prevPage = () => {
    setPokemonListPage(pokemonListPage - 1);
  };
  const nextPage = () => {
    setPokemonListPage(pokemonListPage + 1);
  };

  const skeletonList = Array(pageLimit).fill({
    name: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    owned: 0,
  });

  const layoutMapper = (arr, isLoaded) => {
    return arr.map((item, index) => (
      <GridItem key={index}>
        <ListCard
          name={item.name}
          imageSrc={item.image}
          owned={item.owned}
          onClickCard={() => history.push(`/pokemons/${item.name}`)}
          isLoaded={isLoaded}
        />
      </GridItem>
    ));
  };

  if (error) {
    return (
      <Container height="calc(100vh - 160px)">
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          height="100%"
        >
          <ErrorAlert errorTitle="Not Found" errorDescription={error.message} />
        </Box>
      </Container>
    );
  }
  return (
    <Container maxWidth="container.md">
      <SimpleGrid minChildWidth="150px" spacing="20px" py={7}>
        {!data || data === undefined
          ? layoutMapper(skeletonList, false)
          : layoutMapper(data.pokemons.results, true)}
      </SimpleGrid>

      <ControlButton
        page={pokemonListPage}
        maxPage={maxPage}
        onChangePage={onChangePage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Container>
  );
}

export default PokemonList;
