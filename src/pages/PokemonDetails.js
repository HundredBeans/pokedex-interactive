import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { fetchPokemonDetails } from "../helpers/query";
import { Container } from "@chakra-ui/layout";
import Loader from "../components/Loader";
import DetailsBox from "../components/DetailsBox";
import CatchButton from "../components/CatchButton";
import { useToast } from "@chakra-ui/react";
import { DefaultContext } from "../context/DefaultContext";

function PokemonDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(fetchPokemonDetails, {
    variables: {
      name: id,
    },
  });
  const [catchSuccess, setCatchResult] = useState(false);
  const [catchLoading, setCatchLoading] = useState(false);
  const [isSaving, setSavingState] = useState(false);
  const toast = useToast();
  const catchProbability = 50;
  const { db } = useContext(DefaultContext);
  const showToast = (message, type) => {
    toast({
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
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
        console.log("catchSuccess");
      } else {
        setCatchResult(false);
        showToast("Catching Pokemon Failed!", "error");
        console.log("catchFailed");
      }
      setCatchLoading(false);
    }, 1500);
  };
  const saveNickname = (nickname) => {
    console.log(nickname);
    setSavingState(true);
    db.collection("caughtPokemon")
      .doc({ nickname: nickname })
      .get()
      .then((result) => {
        if (result) {
          showToast("Nickname already taken", "info");
        } else {
          db.collection("caughtPokemon")
            .add({
              pokemonName: id,
              timeCaught: new Date(),
              nickname: nickname,
            })
            .then(() => {
              showToast(
                `${nickname} was successfully added to my-pokemon list!`,
                "success"
              );
              // Route to the pokemon details page
              history.push(`/my-pokemons/${nickname}`);
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
  if (!loading) {
    const pokemonData = data.pokemon;
    console.log(pokemonData);
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
