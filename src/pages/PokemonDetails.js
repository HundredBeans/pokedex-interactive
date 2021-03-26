import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { fetchPokemonDetails, fetchPokemonListQuery } from "../helpers/query";
import Loader from "../components/Loader";
import DetailsBox from "../components/DetailsBox";
import CatchButton from "../components/CatchButton";
import { useToast, Box, Container } from "@chakra-ui/react";
import { db } from "../helpers/db";
import ErrorAlert from "../components/ErrorAlert";
import { client } from "../context/DefaultContext";

function PokemonDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(fetchPokemonDetails, {
    variables: {
      name: id,
    },
  });
  const [catchSuccess, setCatchResult] = useState(false);
  const [catchLoading, setCatchLoading] = useState(false);
  const [isSaving, setSavingState] = useState(false);
  const toast = useToast();
  const catchProbability = 50;
  const showToast = (message, type) => {
    toast({
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  const currentPokemonsCached = client.readQuery({
    query: fetchPokemonListQuery,
    variables: {
      limit: 20,
      offset: 0,
    },
  });
  const catchPokemon = async () => {
    setCatchLoading(true);
    setTimeout(() => {
      // get 50% odds https://stackoverflow.com/questions/44651537/correct-function-using-math-random-to-get-50-50-chance
      const randomNumber = Math.random();
      const odds = catchProbability / 100;
      const catchSuccess = randomNumber < odds;
      if (catchSuccess) {
        setCatchResult(true);
        showToast("Catching Pokemon Success!", "success");
      } else {
        setCatchResult(false);
        showToast("Catching Pokemon Failed!", "error");
      }
      setCatchLoading(false);
    }, 1500);
  };
  const saveNickname = (nickname) => {
    setSavingState(true);
    const caughtPokemonObj = {
      nickname,
      pokemonName: id,
      timeCaught: new Date(),
      imageSrc: data.pokemon.sprites.front_default,
      pokemonData: data,
    };
    db.collection("caughtPokemon")
      .doc({ nickname: nickname })
      .get()
      .then((result) => {
        if (result) {
          showToast("Nickname already taken", "info");
        } else {
          db.collection("caughtPokemon")
            .add(caughtPokemonObj)
            .then(() => {
              showToast(
                `${nickname} was successfully added to my-pokemon list!`,
                "success"
              );
              let updatedPokemon = JSON.parse(
                JSON.stringify(currentPokemonsCached)
              );
              updatedPokemon.pokemons.results[data.pokemon.id - 1].owned += 1;
              client.writeQuery({
                query: fetchPokemonListQuery,
                data: updatedPokemon,
                variables: {
                  limit: 20,
                  offset: 0,
                },
              });
              // Route to the pokemon details page
              history.push("/my-pokemons");
            })
            .catch((err) =>
              showToast(`Error adding ${nickname} - ${err.message}`, "error")
            );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      })
      .finally(() => setSavingState(false));
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

  if (!loading) {
    const pokemonData = data.pokemon;
    return (
      <React.Fragment>
        <Container maxWidth="container.md">
          <DetailsBox
            imageSrc={pokemonData.sprites.front_default}
            id={pokemonData.id}
            types={pokemonData.types}
            height={pokemonData.height}
            weight={pokemonData.weight}
            moves={pokemonData.moves}
          />
        </Container>
        <CatchButton
          pokemonName={pokemonData.name}
          catchProbability={catchProbability}
          catchPokemon={catchPokemon}
          catchLoading={catchLoading}
          catchSuccess={catchSuccess}
          saveNickname={saveNickname}
          isSaving={isSaving}
        />
      </React.Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default PokemonDetails;
