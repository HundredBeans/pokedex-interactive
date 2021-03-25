import React from "react";
import { Container, Heading, Spinner } from "@chakra-ui/react";

function Loader(props) {
  return (
    <Container
      h={"calc(100vh - 160px)"}
      d="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {props.loadingText ? <Heading p={4}>{props.loadingText}</Heading> : ""}
      <Spinner size="xl" color="red.500" />
    </Container>
  );
}

export default Loader;
