import React, { useContext } from "react";
import { Box, Grid, VStack, Text, Code, Link } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { DefaultContext } from "../context/DefaultContext";

function Example() {
  const [pokemons, caughtPokemons] = useContext(DefaultContext);
  pokemons.setItem("test", {
    url: "https://pokeapi.co/api/v2/pokemon/2/",
    name: "ivysaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  });

  caughtPokemons.setItem("testCaught", {
    url: "https://pokeapi.co/api/v2/pokemon/3/",
    name: "venusaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  });

  pokemons
    .getItem("test")
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  caughtPokemons
    .getItem("testCaught")
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Example;
