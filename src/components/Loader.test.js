import { cleanup } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import Loader from "./Loader";

describe("Loader.js tets", () => {
  const loadingText = "Loading Content";

  afterEach(() => {
    cleanup();
  });

  it("renders the component without text", () => {
    const renderedComponent = render(<Loader />);
    expect(renderedComponent).toMatchSnapshot();
    // Check if the text is not exist in the document
    expect(renderedComponent.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders the component without text", () => {
    const renderedComponent = render(<Loader loadingText={loadingText} />);
    expect(renderedComponent).toMatchSnapshot();
    // Check if the text is exist in the document
    expect(renderedComponent.queryByRole("heading")).toBeInTheDocument();
  });
});
