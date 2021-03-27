import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Image,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import control from "../assets/control.png";

function ControlButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(!isOpen);
  };
  const closePopover = () => {
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <Box
        bottom="0"
        left="50%"
        transform="translate(-50%, 0);"
        position="fixed"
        zIndex="banner"
        shadow="lg"
        rounded="full"
      >
        <Button
          variant="ghost"
          boxSize="100px"
          width="100%"
          rounded="full"
          onClick={open}
        >
          <Image src={control} />
        </Button>
      </Box>
      <Popover isOpen={isOpen} onClose={closePopover} closeOnBlur={false}>
        <PopoverTrigger>
          <Box bottom="250px" right="50%" position="fixed"></Box>
        </PopoverTrigger>
        <PopoverContent width="50%" mx="auto" shadow="dark-lg">
          <PaginationForm {...props} />
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
}

const PaginationForm = (props) => {
  return (
    <React.Fragment>
      <PopoverBody>
        <FormControl>
          <FormLabel htmlFor="nickname" textTransform="capitalize">
            Change Page
          </FormLabel>
          <NumberInput
            textAlign="center"
            size="md"
            max={props.maxPage}
            value={props.page}
            min={1}
            onChange={(e) => props.onChangePage(e)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </PopoverBody>
      <PopoverFooter textAlign="center">
        <ButtonGroup size="sm">
          <Button
            colorScheme="teal"
            disabled={props.page === 1}
            onClick={props.prevPage}
          >
            Back
          </Button>
          <Button
            colorScheme="teal"
            disabled={props.page === props.maxPage}
            onClick={props.nextPage}
          >
            Next
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </React.Fragment>
  );
};

export default ControlButton;
