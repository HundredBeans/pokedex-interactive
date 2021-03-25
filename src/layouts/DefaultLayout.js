import React from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "./Navigation";

function DefaultLayout(props) {
  const headerHeight = "80px";

  return (
    <React.Fragment>
      <Box maxHeight="100vh">
        <Navigation headerHeight={headerHeight} />
        <Box
          paddingTop={headerHeight}
          paddingBottom={headerHeight}
          height={`calc(100% - ${headerHeight})`}
        >
          {props.children}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default DefaultLayout;
