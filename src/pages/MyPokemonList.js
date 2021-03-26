import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Container, SimpleGrid, GridItem } from "@chakra-ui/react";
import ListCard from "../components/ListCard";
import { db } from "../helpers/db";
import { useHistory } from "react-router";

function MyPokemonList() {
  const [isLoading, setLoadingState] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const history = useHistory();

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

  useEffect(() => getPokemonList(), []);
  if (isLoading) {
    return <Loader loadingText="Load Pokemons..."></Loader>;
  }

  return (
    <Container maxWidth="container.md">
      <SimpleGrid minChildWidth="150px" spacing="40px" py={7}>
        {pokemonList.map((item) => (
          <GridItem key={item.nickname}>
            <ListCard
              name={item.nickname}
              imageSrc={item.imageSrc}
              owned={1}
              onClickCard={() => history.push(`/my-pokemons/${item.nickname}`)}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default MyPokemonList;
