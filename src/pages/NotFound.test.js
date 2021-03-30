import React from "react";
import { render } from "../test-utils";
import NotFound from "./NotFound";

it("renders the component", () => {
  const renderedComponent = render(<NotFound />);
  expect(renderedComponent).toMatchSnapshot();
});
