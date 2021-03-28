import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

function RemoveModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent my="auto">
        <ModalHeader>Remove Pokemon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to remove &apos;{props.nickname}&apos;?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={props.closeModal}
            isLoading={props.buttonLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            isLoading={props.buttonLoading}
            loadingText="Removing..."
            onClick={props.removeItem}
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RemoveModal;
