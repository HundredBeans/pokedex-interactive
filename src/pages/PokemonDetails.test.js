import React from "react";
import PokemonDetails from "./PokemonDetails";
import { customRender } from "../context/test-utils-context";
import { fetchPokemonDetails } from "../helpers/query";
import { fireEvent, waitFor } from "@testing-library/dom";

const id = "IVYSAUR";
jest.mock("../components/Loader", () => {
  const Loader = () => <div>Loading...</div>;
  return Loader;
});
const mockPushFn = jest.fn();
// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPushFn,
  }),
  useParams: () => ({
    id,
  }),
}));

// Mock localbase
jest.mock("../helpers/db", () => ({
  db: jest.fn(),
}));
const pageLimit = 2;
const pokemonListPage = 1;
const providerProps = {
  pageLimit,
  pokemonListPage,
};
const mockQuery = [
  {
    request: {
      query: fetchPokemonDetails,
      variables: {
        name: id,
      },
    },
    result: {
      data: {
        pokemon: {
          height: 10,
          id: 2,
          moves: [
            {
              move: {
                url: "https://pokeapi.co/api/v2/move/14/",
                name: "swords-dance",
                __typename: "BaseName",
              },
              __typename: "Move",
            },
          ],
          name: "ivysaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            __typename: "Sprite",
          },
          stats: [
            {
              base_stat: 60,
              effort: 0,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/1/",
                name: "hp",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
            {
              base_stat: 62,
              effort: 0,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/2/",
                name: "attack",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
            {
              base_stat: 63,
              effort: 0,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/3/",
                name: "defense",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
            {
              base_stat: 80,
              effort: 1,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/4/",
                name: "special-attack",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
            {
              base_stat: 80,
              effort: 1,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/5/",
                name: "special-defense",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
            {
              base_stat: 60,
              effort: 0,
              stat: {
                url: "https://pokeapi.co/api/v2/stat/6/",
                name: "speed",
                __typename: "BaseName",
              },
              __typename: "Stat",
            },
          ],
          types: [
            {
              slot: 1,
              type: {
                url: "https://pokeapi.co/api/v2/type/12/",
                name: "grass",
                __typename: "BaseName",
              },
              __typename: "Type",
            },
            {
              slot: 2,
              type: {
                url: "https://pokeapi.co/api/v2/type/4/",
                name: "poison",
                __typename: "BaseName",
              },
              __typename: "Type",
            },
          ],
          weight: 130,
          message: "",
          __typename: "Pokemon",
        },
      },
    },
  },
];

it("renders the component (loading)", () => {
  const renderedComponent = customRender(<PokemonDetails />, {
    providerProps,
    mockQuery,
  });
  expect(renderedComponent).toMatchSnapshot("loading");
  expect(renderedComponent.getByText("Loading..."));
});

it("renders the component (data-fetched)", async () => {
  const renderedComponent = customRender(<PokemonDetails />, {
    providerProps,
    mockQuery,
  });
  await waitFor(() => {
    expect(renderedComponent).toMatchSnapshot("data-fetched");
    expect(renderedComponent.getByText(id)).toBeInTheDocument();
    expect(renderedComponent.getByText("grass")).toBeInTheDocument();
    expect(renderedComponent.getByText("poison")).toBeInTheDocument();
  });
});

it("renders the component (error)", async () => {
  const errorMessage = "Oops, Error Occured!";
  const mockQueryError = [
    {
      request: {
        query: fetchPokemonDetails,
        variables: {
          name: id,
        },
      },
      error: new Error(errorMessage),
    },
  ];
  const renderedComponent = customRender(<PokemonDetails />, {
    providerProps,
    mockQuery: mockQueryError,
  });
  await waitFor(() => {
    renderedComponent.getByText(errorMessage);
  });
  expect(renderedComponent).toMatchSnapshot("error");
  expect(renderedComponent.getByText(errorMessage)).toBeInTheDocument();
  expect(renderedComponent.getByText(errorMessage)).toBeVisible();
});

it("can open and close the popOver", async () => {
  const renderedComponent = customRender(<PokemonDetails />, {
    providerProps,
    mockQuery,
  });
  let popOverContent;
  let popoverTriggerBtn;
  await waitFor(() => {
    // Check if the popover is not open
    popOverContent = renderedComponent.getByText("Catch ivysaur");
    expect(popOverContent).not.toBeVisible();
    popoverTriggerBtn = renderedComponent.getByRole("button");
  });
  fireEvent.click(popoverTriggerBtn);
  await waitFor(() => {
    // Check if popover visible
    expect(popOverContent).toBeVisible();
  });
  fireEvent.click(renderedComponent.getByText("Cancel"));
  await waitFor(() => {
    // Check if popover is closed
    expect(popOverContent).not.toBeVisible();
  });
});

// test("catch pokemon button", async () => {
//   const renderedComponent = customRender(<PokemonDetails />, {
//     providerProps,
//     mockQuery,
//   });
//   await waitFor(() => {
//     renderedComponent.getByRole("button");
//   });
//   fireEvent.click(renderedComponent.getByRole("button"));
//   let catchButton;
//   await waitFor(() => {
//     catchButton = renderedComponent.getByText("Catch");
//   });
//   fireEvent.click(catchButton);
// });
