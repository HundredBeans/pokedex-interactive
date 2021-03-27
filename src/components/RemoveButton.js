import React from "react";
import {
  Button,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalCloseButton,
  // ModalBody,
  // ModalFooter,
  // Text,
  Icon,
} from "@chakra-ui/react";
import { MdRemoveCircle } from "react-icons/md";

function RemoveButton(props) {
  return (
    <React.Fragment>
      <Button size="sm" colorScheme="red" onClick={props.openModal}>
        <Icon mr={1} as={MdRemoveCircle}></Icon> Remove
      </Button>
    </React.Fragment>
  );
}

export default RemoveButton;
