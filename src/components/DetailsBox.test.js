import { cleanup } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import DetailsBox from "./DetailsBox";

describe("DetailsBox.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component (pokemonDetails without caughtDate)", () => {
    const pokemonData = {
      height: 17,
      id: 87,
      moves: [
        {
          move: {
            url: "https://pokeapi.co/api/v2/move/6/",
            name: "pay-day",
            __typename: "BaseName",
          },
          __typename: "Move",
        },
      ],
      name: "dewgong",
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png",
        __typename: "Sprite",
      },
      types: [
        {
          slot: 1,
          type: {
            url: "https://pokeapi.co/api/v2/type/11/",
            name: "water",
            __typename: "BaseName",
          },
          __typename: "Type",
        },
        {
          slot: 2,
          type: {
            url: "https://pokeapi.co/api/v2/type/15/",
            name: "ice",
            __typename: "BaseName",
          },
          __typename: "Type",
        },
      ],
      weight: 1200,
      message: "",
      timeCaught: "3/28/2021, 7:05:48 PM",
      __typename: "Pokemon",
    };
    const renderedComponent = render(
      <DetailsBox
        imageSrc={pokemonData.sprites.front_default}
        id={pokemonData.id}
        types={pokemonData.types}
        height={pokemonData.height}
        weight={pokemonData.weight}
        moves={pokemonData.moves}
        pokemonName={pokemonData.name}
      />
    );
    expect(renderedComponent).toMatchSnapshot("without-caughtDate");
    renderedComponent.rerender(
      <DetailsBox
        imageSrc={pokemonData.sprites.front_default}
        id={pokemonData.id}
        types={pokemonData.types}
        height={pokemonData.height}
        weight={pokemonData.weight}
        moves={pokemonData.moves}
        pokemonName={pokemonData.name}
        caughtDate={pokemonData.timeCaught}
      />
    );
    expect(renderedComponent).toMatchSnapshot("with-caughtDate");
  });
});
