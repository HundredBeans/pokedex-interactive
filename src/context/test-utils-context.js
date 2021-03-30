import React from "react";
import { render } from "../test-utils";
import { MockedProvider } from "@apollo/client/testing";
import { PaginationContext } from "./PaginationContext";

// Custom render to provide Apollo Provider and Pagination Context Provider for Unit Testing purpose
export const customRender = (
  ui,
  { providerProps, mockQuery, ...renderOptions }
) => {
  return render(
    <MockedProvider mocks={mockQuery} addTypename={false}>
      <PaginationContext.Provider value={providerProps}>
        {ui}
      </PaginationContext.Provider>
    </MockedProvider>,
    renderOptions
  );
};
