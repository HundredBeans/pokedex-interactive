import React from "react";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../test-utils";
import { MemoryRouter } from "react-router-dom";
import BackButton from "./BackButton";

// Mock history function https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest
const mockGoBackFn = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    goBack: mockGoBackFn,
  }),
}));

describe("BackButton.js test", () => {
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders BackButton component", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it("call history goBack function after clicking the button", async () => {
    const backBtn = screen.getByRole("button");
    fireEvent.click(backBtn);
    await waitFor(() => {
      expect(mockGoBackFn).toHaveBeenCalled();
    });
  });
});
