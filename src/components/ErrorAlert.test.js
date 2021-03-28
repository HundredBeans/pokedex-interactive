import { cleanup } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import ErrorAlert from "./ErrorAlert";

describe("ErrorAlert.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    const renderedComponent = render(<ErrorAlert />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
