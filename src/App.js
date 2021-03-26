import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import DefaultLayout from "./layouts/DefaultLayout";
import { DefaultContextProvider } from "./context/DefaultContext";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import MyPokemonList from "./pages/MyPokemonList";
import MyPokemonDetails from "./pages/MyPokemonDetails";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultContextProvider>
        <BrowserRouter>
          <Switch>
            <DefaultLayout>
              <Route exact path="/pokemons">
                <PokemonList />
              </Route>
              <Route exact path="/pokemons/:id">
                <PokemonDetails />
              </Route>
              <Route exact path="/my-pokemons">
                <MyPokemonList />
              </Route>
              <Route exact path="/my-pokemons/:id">
                <MyPokemonDetails />
              </Route>
              <Route exact path="/">
                <Redirect to="/pokemons" />
              </Route>
            </DefaultLayout>
          </Switch>
        </BrowserRouter>
      </DefaultContextProvider>
    </ChakraProvider>
  );
}

export default App;
