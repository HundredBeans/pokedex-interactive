import React from "react";
import { customRender } from "../context/test-utils-context";
import PokemonList from "./PokemonList";
import { fetchPokemonListQuery } from "../helpers/query";
import { cleanup, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
// import { GraphQLError } from "graphql";

const mockPushFn = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPushFn,
  }),
}));
const setPokemonListPageMock = jest.fn();
const pokemonListPage = 1;
const pageLimit = 2;
const providerProps = {
  pokemonListPage: pokemonListPage,
  setPokemonListPage: setPokemonListPageMock,
  pageLimit: 2,
};
const mockQuery = [
  {
    request: {
      query: fetchPokemonListQuery,
      variables: {
        limit: pageLimit,
        offset: (pokemonListPage - 1) * pageLimit,
      },
    },
    result: {
      data: {
        pokemons: {
          count: 1118,
          results: [
            {
              name: "charizard",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
              owned: 5,
            },
            {
              name: "ivysaur",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
              owned: 10,
            },
          ],
          __typename: "PokemonList",
        },
      },
    },
  },
];

afterEach(() => {
  cleanup();
});

it("renders the component (data fetched)", async () => {
  const renderedComponent = customRender(<PokemonList />, {
    providerProps,
    mockQuery,
  });
  await waitFor(() => {
    renderedComponent.getByText("IVYSAUR");
    renderedComponent.getByText("CHARIZARD");
  });
  expect(renderedComponent).toMatchSnapshot("data-fetched");
  expect(renderedComponent.queryByText("IVYSAUR")).toBeInTheDocument();
  expect(renderedComponent.queryByText("CHARIZARD")).toBeInTheDocument();
  expect(renderedComponent.queryByText("BULBASAUR")).not.toBeInTheDocument();
});

it("renders the component (loading)", async () => {
  const renderedComponent = customRender(<PokemonList />, {
    providerProps,
    mockQuery,
  });
  expect(renderedComponent).toMatchSnapshot("loading");
  expect(renderedComponent.queryByText("IVYSAUR")).not.toBeInTheDocument();
  expect(renderedComponent.queryByText("CHARIZARD")).not.toBeInTheDocument();
  expect(renderedComponent.getAllByText("BULBASAUR")).toHaveLength(pageLimit);
});

it("can open and close the popOver", async () => {
  const renderedComponent = customRender(<PokemonList />, {
    providerProps,
    mockQuery,
  });
  // Check if the popover is not open
  const popOverContent = renderedComponent.getByText("Change Page");
  expect(popOverContent).not.toBeVisible();
  const popoverTriggerBtn = renderedComponent.getByRole("button");
  fireEvent.click(popoverTriggerBtn);
  await waitFor(() => {
    // Check if popover visible
    expect(popOverContent).toBeVisible();
  });
  fireEvent.click(popoverTriggerBtn);
  await waitFor(() => {
    // Check if popover is closed
    expect(popOverContent).not.toBeVisible();
  });
});

it("can handle fetching error", async () => {
  const errorMessage = "Oops, Error Occured!";
  const mockQueryError = [
    {
      request: {
        query: fetchPokemonListQuery,
        variables: {
          limit: pageLimit,
          offset: (pokemonListPage - 1) * pageLimit,
        },
      },
      error: new Error(errorMessage),
    },
  ];
  const renderedComponent = customRender(<PokemonList />, {
    providerProps,
    mockQuery: mockQueryError,
  });
  await waitFor(() => {
    renderedComponent.getByText(errorMessage);
  });
  expect(renderedComponent.getByText(errorMessage)).toBeInTheDocument();
  expect(renderedComponent.getByText(errorMessage)).toBeVisible();
});

test("pagination form is working", async () => {
  const renderedComponent = customRender(<PokemonList />, {
    providerProps,
    mockQuery,
  });
  // Check if the popover is not open
  const popOverContent = renderedComponent.getByText("Change Page");
  const popoverTriggerBtn = renderedComponent.getByRole("button");
  fireEvent.click(popoverTriggerBtn);
  // Wait for the popover is visible
  await waitFor(() => {
    // Check if popover visible
    expect(popOverContent).toBeVisible();
  });
  const prevPageBtn = renderedComponent.getByText("Back");
  expect(prevPageBtn).toBeDisabled();
  const nextPageBtn = renderedComponent.getByText("Next");
  expect(nextPageBtn).not.toBeDisabled();
  fireEvent.click(nextPageBtn);
  expect(setPokemonListPageMock).toBeCalled();
  // Test Pagination Input with normal value
  const paginationInput = renderedComponent.getByLabelText("Change Page");
  fireEvent.change(paginationInput, {
    target: {
      value: 10,
    },
  });
  await waitFor(() => {
    expect(setPokemonListPageMock).toBeCalled();
    setPokemonListPageMock.mockClear();
  });
  // Test Pagination Input with null value
  fireEvent.change(paginationInput, {
    target: {
      value: "",
    },
  });
  await waitFor(() => {
    expect(setPokemonListPageMock).not.toBeCalled();
    setPokemonListPageMock.mockClear();
  });

  // Test Pagination Input with value < 1
  fireEvent.change(paginationInput, {
    target: {
      value: -1,
    },
  });
  await waitFor(() => {
    expect(setPokemonListPageMock).toBeCalled();
    setPokemonListPageMock.mockClear();
  });

  // Test Pagination Input with value > maxPage
  fireEvent.change(paginationInput, {
    target: {
      value: 1000000,
    },
  });
  await waitFor(() => {
    expect(setPokemonListPageMock).toBeCalled();
    setPokemonListPageMock.mockClear();
  });
});

test("page route when item get clicked", async () => {
  const renderedComponent = customRender(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
    {
      providerProps,
      mockQuery,
    }
  );
  let cardComponent;
  await waitFor(() => {
    cardComponent = renderedComponent.getByText("IVYSAUR");
  });
  fireEvent.click(cardComponent);
  await waitFor(() => {
    expect(mockPushFn).toBeCalled();
  });
});
