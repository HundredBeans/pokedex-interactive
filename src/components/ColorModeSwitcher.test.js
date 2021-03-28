import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import ColorModeSwitcher from "./ColorModeSwitcher";

describe("ColorModeSwitcher.js test", () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(<ColorModeSwitcher />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders ColorModeSwitcher component", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  it("Update the color", async () => {
    const colorSwitcherBtn = screen.getByRole("button");
    const lightModeLabel = "Switch to light mode";
    const darkModeLabel = "Switch to dark mode";
    // Check Initial Color Mode (Light)
    expect(colorSwitcherBtn).toHaveAttribute("aria-label", darkModeLabel);
    fireEvent.click(colorSwitcherBtn);
    await waitFor(() => {
      expect(colorSwitcherBtn).toHaveAttribute("aria-label", lightModeLabel);
    });
  });
});
