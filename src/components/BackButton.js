import React from "react";
import { Box, Icon, IconButton } from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();

  return (
    <Box d="flex" alignItems="center" justifyContent="center">
      <IconButton variant="ghost" onClick={() => history.goBack()}>
        <Icon fontSize="3xl" as={MdKeyboardBackspace} />
      </IconButton>
    </Box>
  );
}

export default BackButton;
