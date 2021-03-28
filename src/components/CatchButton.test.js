import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import CatchButton from "./CatchButton";

describe("CatchButton.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component (Initial Content)", () => {
    const renderedComponent = render(<CatchButton catchSuccess={false} />);
    expect(renderedComponent).toMatchSnapshot("initial-content");
  });

  it("renders the component (CatchSuccess Content)", () => {
    const renderedComponent = render(<CatchButton catchSuccess={true} />);
    expect(renderedComponent).toMatchSnapshot("catchSuccess-content");
  });

  it("renders the component (CatchLoading Content)", () => {
    const renderedComponent = render(
      <CatchButton catchSuccess={false} catchLoading={true} />
    );
    expect(renderedComponent).toMatchSnapshot("catchLoading-content");
  });

  test("setNicknameForm working correctly", async () => {
    const saveNickname = jest.fn();
    const pokemonName = "bulbasaur";
    const nickname = "Bulbasaur Nickname";
    const renderedComponent = render(
      <CatchButton
        catchSuccess={true}
        pokemonName={pokemonName}
        isSaving={false}
        saveNickname={saveNickname}
      />
    );
    const nicknameFormInput = renderedComponent.getByLabelText(
      `Your ${pokemonName}'s Nickname`
    );
    const saveButton = renderedComponent.getByText("Save");
    // Check if the button is disabled at first
    expect(saveButton).toBeDisabled();
    fireEvent.change(nicknameFormInput, { target: { value: nickname } });
    await waitFor(() => {
      // Check if the button is not disabled
      expect(saveButton).not.toBeDisabled();
      expect(nicknameFormInput.value).toBe(nickname);
      fireEvent.click(saveButton);
      expect(saveNickname).toHaveBeenCalled();
    });
  });
});
