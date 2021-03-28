import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import ControlButton from "./ControlButton";

describe("ControlButton.js test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    const renderedComponent = render(<ControlButton />);
    expect(renderedComponent).toMatchSnapshot();
  });

  it("can open and close the popOver", async () => {
    const renderedComponent = render(<ControlButton />);
    // Check if the popover is not open
    const popOverContent = renderedComponent.getByText("Change Page");
    expect(popOverContent).not.toBeVisible();
    const popoverTriggerBtn = renderedComponent.getByRole("button");
    fireEvent.click(popoverTriggerBtn);
    await waitFor(() => {
      // Check if popover visible
      expect(popOverContent).toBeVisible();
    });
    fireEvent.click(popoverTriggerBtn);
    await waitFor(() => {
      // Check if popover is closed
      expect(popOverContent).not.toBeVisible();
    });
  });

  test("pagination form is working", async () => {
    const prevPageMock = jest.fn();
    const nextPageMock = jest.fn();
    const onChangePageMock = jest.fn();
    const renderedComponent = render(
      <ControlButton
        page={1}
        maxPage={10}
        onChangePage={onChangePageMock}
        prevPage={prevPageMock}
        nextPage={nextPageMock}
      />
    );
    // Check if the popover is not open
    const popOverContent = renderedComponent.getByText("Change Page");
    const popoverTriggerBtn = renderedComponent.getByRole("button");
    fireEvent.click(popoverTriggerBtn);
    // Wait for the popover is visible
    await waitFor(() => {
      // Check if popover visible
      expect(popOverContent).toBeVisible();
    });
    const prevPageBtn = renderedComponent.getByText("Back");
    expect(prevPageBtn).toBeDisabled();
    const nextPageBtn = renderedComponent.getByText("Next");
    expect(nextPageBtn).not.toBeDisabled();
    fireEvent.click(nextPageBtn);
    expect(nextPageMock).toBeCalled();
    // Test Pagination Input
    const paginationInput = renderedComponent.getByLabelText("Change Page");
    fireEvent.change(paginationInput, {
      target: {
        value: 10,
      },
    });
    await waitFor(() => {
      expect(onChangePageMock).toBeCalled();
    });
  });
});
