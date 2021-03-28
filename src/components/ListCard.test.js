import { cleanup } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import ListCard from "./ListCard";

describe("ListCard.js test", () => {
  let renderedComponent;

  const onClickCardMock = jest.fn();
  const pokemonData = {
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    owned: 1,
  };

  beforeEach(() => {
    renderedComponent = render(
      <ListCard
        name={pokemonData.name}
        imageSrc={pokemonData.image}
        owned={pokemonData.owned}
        onClickCard={onClickCardMock}
        isLoaded={true}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the component (loaded)", () => {
    expect(renderedComponent).toMatchSnapshot("loaded");
    // Check if the card is showing / visible
    const nameElement = renderedComponent.getByText(
      pokemonData.name.toString().toUpperCase()
    );
    expect(nameElement).toBeVisible();
  });

  it("renders the component (loaded without owned)", () => {
    renderedComponent.rerender(
      <ListCard
        name={pokemonData.name}
        imageSrc={pokemonData.image}
        onClickCard={onClickCardMock}
        isLoaded={false}
      />
    );
    expect(renderedComponent).toMatchSnapshot("loaded-without-owned");
  });

  it("renders the component (loading)", () => {
    renderedComponent.rerender(
      <ListCard
        name={pokemonData.name}
        imageSrc={pokemonData.image}
        owned={pokemonData.owned}
        onClickCard={onClickCardMock}
        isLoaded={false}
      />
    );
    expect(renderedComponent).toMatchSnapshot("loading");
  });
});
