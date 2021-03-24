import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import pokedex from "../assets/pokedex.png";

function HeaderLogo() {
  return (
    <Box d="flex" alignItems="center" justifyContent="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={pokedex}
        alt="Segun Adebayo"
        size="md"
        mr="3"
      />
      <Heading>Pokedex</Heading>
    </Box>
  );
}

export default HeaderLogo;
