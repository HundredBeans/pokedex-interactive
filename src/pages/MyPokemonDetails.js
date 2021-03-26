import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@chakra-ui/layout";
import Loader from "../components/Loader";
import DetailsBox from "../components/DetailsBox";
import { db } from "../helpers/db";

function PokemonDetails() {
  const { id } = useParams();
  const [isLoading, setLoadingStatus] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const getPokemonDetails = () => {
    db.collection("caughtPokemon")
      .doc({ nickname: id })
      .get()
      .then((result) => setPokemonDetails(result))
      .catch((err) => console.log(err))
      .finally(() => setLoadingStatus(false));
  };

  useEffect(() => getPokemonDetails(), []);

  if (!isLoading) {
    return (
      <React.Fragment>
        <Container maxWidth="container.md">
          <DetailsBox
            imageSrc={pokemonDetails.imageSrc}
            id={pokemonDetails.pokemonData.pokemon.id}
            types={pokemonDetails.pokemonData.pokemon.types}
            height={pokemonDetails.pokemonData.pokemon.height}
            weight={pokemonDetails.pokemonData.pokemon.weight}
            moves={pokemonDetails.pokemonData.pokemon.moves}
          />
        </Container>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default PokemonDetails;
