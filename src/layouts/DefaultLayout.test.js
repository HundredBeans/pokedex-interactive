import React from "react";
import DefaultLayout from "./DefaultLayout";
import { render } from "../test-utils";

jest.mock("./Navigation", () => {
  const mockNavigation = () => <div>Navigation</div>;
  return mockNavigation;
});

test("DefaultLayout renders the children", () => {
  const Child = () => <h1>Children</h1>;
  const renderedComponent = render(
    <DefaultLayout>
      <Child />
    </DefaultLayout>
  );
  expect(renderedComponent.getByText("Children")).toBeVisible();
  expect(renderedComponent.getByText("Children")).toBeInTheDocument();
});
