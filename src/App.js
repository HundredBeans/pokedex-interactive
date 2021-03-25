import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import DefaultLayout from "./layouts/DefaultLayout";
import { DefaultContextProvider } from "./context/DefaultContext";
import Example from "./pages/Example";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import ExchangeRates from "./pages/Main";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultContextProvider>
        <BrowserRouter>
          <Switch>
            <DefaultLayout>
              <Route exact path="/example">
                <Example />
              </Route>
              <Route exact path="/pokemons">
                <PokemonList />
              </Route>
              <Route exact path="/pokemons/:id">
                <PokemonDetails />
              </Route>
              <Route exact path="/">
                <ExchangeRates />
              </Route>
            </DefaultLayout>
          </Switch>
        </BrowserRouter>
      </DefaultContextProvider>
    </ChakraProvider>
  );
}

export default App;
