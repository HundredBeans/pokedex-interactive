import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import App from "./App";

test("lazy load the component in App.js", () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading Content.../i);
  expect(linkElement).toBeInTheDocument();
});
