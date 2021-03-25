import { Box, Flex, Heading, Image, Badge } from "@chakra-ui/react";
import React from "react";
import placeholder from "../assets/placeholder.png";

const ListCard = (props) => {
  return (
    <Box
      borderRadius="lg"
      _hover={{ boxShadow: "lg" }}
      px={2}
      boxShadow="xs"
      onClick={props.onClickCard}
    >
      <Flex flexDirection="column" justify="center" align="center" py={5}>
        <Heading as="h3" size="md">
          {props.name.toString().toUpperCase()}
        </Heading>
        <Image fallbackSrc={placeholder} boxSize="130px" src={props.imageSrc} />
        <Badge variant="subtle" colorScheme={props.owned ? "green" : "red"}>
          Owned - {props.owned || 0}{" "}
        </Badge>
      </Flex>
    </Box>
  );
};

export default ListCard;
