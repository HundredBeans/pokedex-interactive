import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { PaginationContextProvider } from "./context/PaginationContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <PaginationContextProvider>
        <AppRouter></AppRouter>
      </PaginationContextProvider>
    </ChakraProvider>
  );
}

export default App;
