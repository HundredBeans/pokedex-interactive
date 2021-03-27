import React, { useContext, useEffect, useState } from "react";
// import Loader from "../components/Loader";
import {
  Container,
  SimpleGrid,
  GridItem,
  useToast,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import ListCard from "../components/ListCard";
import { db } from "../helpers/db";
import { client } from "../helpers/cache";
import { useHistory } from "react-router";
import RemoveButton from "../components/RemoveButton";
import { PaginationContext } from "../context/DefaultContext";
import { fetchPokemonListQuery } from "../helpers/query";
import RemoveModal from "../components/RemoveModal";
import ErrorAlert from "../components/ErrorAlert";

function MyPokemonList() {
  const [isLoading, setLoadingState] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { pokemonListPage, pageLimit } = useContext(PaginationContext);
  const [removedPokemon, setremovedPokemon] = useState("");
  const history = useHistory();
  const toast = useToast();
  // Modal and Remove Button
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (pokemon) => {
    setremovedPokemon(pokemon);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getPokemonList = () => {
    db.collection("caughtPokemon")
      .orderBy("timeCaught", "desc")
      .get()
      .then((result) => {
        setPokemonList(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingState(false));
  };

  const updateCachedPokemon = (pokemonName) => {
    const currentPokemonsCached = client.readQuery({
      query: fetchPokemonListQuery,
      variables: {
        limit: pageLimit,
        offset: (pokemonListPage - 1) * pageLimit,
      },
    });
    let updatedPokemon = JSON.parse(JSON.stringify(currentPokemonsCached));
    try {
      updatedPokemon.pokemons.results.forEach((item) => {
        item.name === pokemonName;
        item.owned -= 1;
      });
    } catch (error) {
      console.log(error);
    }
    client.writeQuery({
      query: fetchPokemonListQuery,
      data: updatedPokemon,
      variables: {
        limit: pageLimit,
        offset: (pokemonListPage - 1) * pageLimit,
      },
    });
  };

  const removeItem = () => {
    setButtonLoading(true);
    db.collection("caughtPokemon")
      .doc({ nickname: removedPokemon.nickname })
      .delete()
      .then(() => {
        toast({
          description: "Pokemon Removed",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        updateCachedPokemon(removedPokemon.pokemonName);
        closeModal();
        // Refetch pokemonlist
        getPokemonList();
      })
      .catch((err) => {
        toast({
          description: `Removing Pokemon Failed - ${err.message}`,
          status: "danger",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => setButtonLoading(false));
  };

  useEffect(() => getPokemonList(), []);

  const skeletonList = Array(pageLimit).fill({
    nickname: "bulbasaur",
    imageSrc:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  });

  const layoutMapper = (arr, isLoaded) => {
    return arr.map((item, index) => (
      <GridItem key={index} textAlign="center">
        <ListCard
          name={item.nickname}
          imageSrc={item.imageSrc}
          owned={1}
          onClickCard={() => history.push(`/my-pokemons/${item.nickname}`)}
          isLoaded={isLoaded}
        />
        <Skeleton isLoaded={isLoaded}>
          <RemoveButton openModal={() => openModal(item)}></RemoveButton>
        </Skeleton>
      </GridItem>
    ));
  };

  // if (isLoading) {
  //   return <Loader loadingText="Load Pokemons..."></Loader>;
  // }

  if (!isLoading && pokemonList.length === 0) {
    return (
      <Container height="calc(100vh - 160px)">
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          height="100%"
        >
          <ErrorAlert errorDescription="You don't have any pokemon yet!" />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="container.md">
      <SimpleGrid minChildWidth="150px" spacing="20px" py={7}>
        {isLoading
          ? layoutMapper(skeletonList, false)
          : layoutMapper(pokemonList, true)}
      </SimpleGrid>
      <RemoveModal
        nickname={removedPokemon.nickname}
        removeItem={removeItem}
        buttonLoading={buttonLoading}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </Container>
  );
}

export default MyPokemonList;
