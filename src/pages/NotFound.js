import React from "react";
import { Container, Box } from "@chakra-ui/react";
import ErrorAlert from "../components/ErrorAlert";

function NotFound() {
  return (
    <Container height="calc(100vh - 160px)">
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        height="100%"
      >
        <ErrorAlert
          errorTitle="Error 404"
          errorDescription="The page you are looking for is not found."
        />
      </Box>
    </Container>
  );
}

export default NotFound;
