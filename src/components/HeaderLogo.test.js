import { cleanup } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import HeaderLogo from "./HeaderLogo";

describe("HeaderLogo.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    const renderedComponent = render(<HeaderLogo />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
