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
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import control from "../assets/control.png";

function ControlButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(!isOpen);
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
      <Popover isOpen={isOpen} closeOnBlur={false}>
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
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    defaultValue: props.page,
    min: 1,
    max: props.maxPage,
    id: "pagination",
  });
  const next = getIncrementButtonProps({ onClick: props.nextPage });
  const prev = getDecrementButtonProps({ onClick: props.prevPage });
  const input = getInputProps({
    isReadOnly: false,
    onChange: (e) => props.onChangePage(e),
  });
  return (
    <React.Fragment>
      <PopoverBody>
        <FormControl>
          <FormLabel htmlFor="pagination" textTransform="capitalize">
            Change Page
          </FormLabel>
          <Input {...input} />
        </FormControl>
      </PopoverBody>
      <PopoverFooter textAlign="center">
        <ButtonGroup size="sm">
          <Button {...prev} colorScheme="teal" disabled={props.page === 1}>
            Back
          </Button>
          <Button
            {...next}
            colorScheme="teal"
            disabled={props.page === props.maxPage}
          >
            Next
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </React.Fragment>
  );
};

export default ControlButton;
