import { Box, Flex, Heading, Image, Badge, Tooltip } from "@chakra-ui/react";
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
        <Tooltip
          label={props.name.toString().toUpperCase()}
          aria-label="Pokemon Name"
        >
          <Heading as="h3" size="md" isTruncated={true} maxWidth="150px">
            {props.name.toString().toUpperCase()}
          </Heading>
        </Tooltip>
        <Image fallbackSrc={placeholder} boxSize="130px" src={props.imageSrc} />
        <Badge variant="subtle" colorScheme={props.owned ? "green" : "red"}>
          Owned - {props.owned || 0}{" "}
        </Badge>
      </Flex>
    </Box>
  );
};

export default ListCard;
