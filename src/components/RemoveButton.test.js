import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import RemoveButton from "./RemoveButton";

describe("RemoveButton.js test", () => {
  let renderedComponent;
  const openModalMock = jest.fn();

  beforeEach(() => {
    renderedComponent = render(<RemoveButton openModal={openModalMock} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    expect(renderedComponent).toMatchSnapshot();
  });

  test("onClick function is working", async () => {
    const buttonElement = renderedComponent.getByRole("button");
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(openModalMock).toBeCalled();
    });
  });
});
