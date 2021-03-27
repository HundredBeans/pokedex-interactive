import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@chakra-ui/react";
import Loader from "../components/Loader";
import DetailsBox from "../components/DetailsBox";
import ErrorAlert from "../components/ErrorAlert";
import { db } from "../helpers/db";

function PokemonDetails() {
  const { id } = useParams();
  const [isLoading, setLoadingStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const getPokemonDetails = () => {
    db.collection("caughtPokemon")
      .doc({ nickname: id })
      .get()
      .then((result) => {
        if (result) {
          setPokemonDetails(result);
        } else {
          throw Error("There is no pokemon found");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setLoadingStatus(false));
  };

  useEffect(() => getPokemonDetails(), []);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("en-GB", options);
  };

  if (errorMessage !== null) {
    return (
      <Container height="calc(100vh - 160px)">
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          height="100%"
        >
          <ErrorAlert
            errorTitle="Oops, something's wrong!"
            errorDescription={errorMessage}
          />
        </Box>
      </Container>
    );
  }

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
            caughtDate={formatDate(pokemonDetails.timeCaught)}
            pokemonName={pokemonDetails.pokemonName}
          />
        </Container>
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default PokemonDetails;
