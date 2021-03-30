import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loader from "./components/Loader";
// Code Splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const PokemonList = lazy(() => import("./pages/PokemonList"));
const PokemonDetails = lazy(() => import("./pages/PokemonDetails"));
const MyPokemonList = lazy(() => import("./pages/MyPokemonList"));
const MyPokemonDetails = lazy(() => import("./pages/MyPokemonDetails"));

function AppRouter() {
  return (
    <Router>
      {/* Set Loading fallback */}
      <Suspense fallback={<Loader loadingText={"Loading Content..."} />}>
        <Switch>
          <DefaultLayout>
            <Switch>
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
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </DefaultLayout>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
