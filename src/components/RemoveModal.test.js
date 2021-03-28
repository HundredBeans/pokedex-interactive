import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../test-utils";
import RemoveModal from "./RemoveModal";

describe("RemoveModal.js test", () => {
  const closeModalMock = jest.fn();
  const removeItemMock = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it("renders the component with modal open", async () => {
    const renderedComponent = render(
      <RemoveModal
        isOpen={true}
        closeModal={closeModalMock}
        removeItem={removeItemMock}
        nickname="nickname"
      />
    );
    expect(renderedComponent).toMatchSnapshot("open");
    await waitFor(() => {
      expect(renderedComponent.getByText("Remove Pokemon")).toBeVisible();
    });
  });

  it("renders the component with modal close", async () => {
    const renderedComponent = render(
      <RemoveModal
        isOpen={false}
        closeModal={closeModalMock}
        removeItem={removeItemMock}
        nickname="nickname"
      />
    );
    expect(renderedComponent).toMatchSnapshot("closed");
    await waitFor(() => {
      expect(
        renderedComponent.queryByText("Remove Pokemon")
      ).not.toBeInTheDocument();
    });
  });

  test("onClick function on button is working", async () => {
    const renderedComponent = render(
      <RemoveModal
        isOpen={true}
        closeModal={closeModalMock}
        removeItem={removeItemMock}
        nickname="nickname"
      />
    );
    const removeButton = renderedComponent.getByText("Remove");
    const cancelButton = renderedComponent.getByText("Cancel");
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(removeItemMock).toBeCalled();
    });
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(closeModalMock).toBeCalled();
    });
  });
});
