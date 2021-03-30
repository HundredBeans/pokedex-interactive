import React, { createContext, useState } from "react";

export const PaginationContext = createContext();

export const PaginationContextProvider = (props) => {
  const [pokemonListPage, setPokemonListPage] = useState(1);
  const [myPokemonListPage, setMyPokemonListPage] = useState(1);
  const pageLimit = 20;

  return (
    <PaginationContext.Provider
      value={{
        pokemonListPage,
        setPokemonListPage,
        myPokemonListPage,
        setMyPokemonListPage,
        pageLimit,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};
