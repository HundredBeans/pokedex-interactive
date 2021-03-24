import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import DefaultLayout from "./layouts/DefaultLayout";
import { DefaultContextProvider } from "./context/DefaultContext";
import Example from "./pages/Example";
import ExchangeRates from "./pages/Main";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DefaultContextProvider>
        <BrowserRouter>
          <Switch>
            <DefaultLayout>
              <Route path="/example">
                <Example />
              </Route>
              <Route path="/">
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
