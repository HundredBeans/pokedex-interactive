import React from "react";
import Navigation from "./Navigation";
import { render } from "../test-utils";
import { cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/dom";

// Mock history function https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    location: {
      pathname: "pathname/mocked",
    },
  }),
  matchPath: () => ({
    params: {
      id: "mock-id",
    },
  }),
}));

describe("Navigation.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
