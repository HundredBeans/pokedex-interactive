import {
  Box,
  Flex,
  Heading,
  Image,
  Badge,
  Tooltip,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import placeholder from "../assets/placeholder.png";

const ListCard = (props) => {
  return (
    <Box
      borderRadius="lg"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      px={2}
      boxShadow="xs"
      onClick={props.onClickCard}
    >
      <Tooltip
        label={props.name.toString().toUpperCase()}
        aria-label="Pokemon Name"
      >
        <Flex flexDirection="column" justify="center" align="center" py={5}>
          <Skeleton isLoaded={props.isLoaded} my={3}>
            <Heading as="h3" size="md" isTruncated={true} maxWidth="150px">
              {props.name.toString().toUpperCase()}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={props.isLoaded}>
            <Image
              fallbackSrc={placeholder}
              boxSize="130px"
              src={props.imageSrc}
            />
          </Skeleton>
          <Skeleton isLoaded={props.isLoaded} my={3}>
            <Badge variant="subtle" colorScheme={props.owned ? "green" : "red"}>
              Owned - {props.owned || 0}{" "}
            </Badge>
          </Skeleton>
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default ListCard;
