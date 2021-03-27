import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { DefaultContextProvider } from "./context/DefaultContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultContextProvider>
        <AppRouter></AppRouter>
      </DefaultContextProvider>
    </ChakraProvider>
  );
}

export default App;
