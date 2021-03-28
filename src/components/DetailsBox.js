import React from "react";
import {
  Flex,
  HStack,
  Tag,
  TagLabel,
  Container,
  Image,
  SimpleGrid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  GridItem,
  Text,
} from "@chakra-ui/react";
import placeholder from "../assets/placeholder.png";
import ErrorAlert from "./ErrorAlert";

const CommonInfo = (props) => {
  return (
    <Flex flexDirection="column" align="center">
      <HStack p={3}>
        {props.types.map((item, index) => (
          <Tag key={index} variant="subtle" size="lg" p={2} colorScheme="green">
            <TagLabel fontSize={18} textTransform="capitalize">
              {item.type.name}
            </TagLabel>
          </Tag>
        ))}
      </HStack>
      <Container
        borderColor="teal"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Image fallbackSrc={placeholder} boxSize="250px" src={props.imageSrc} />
        <Divider orientation="vertical" />

        <SimpleGrid
          columns={3}
          spacing={5}
          alignItems="center"
          textAlign="center"
        >
          <GridItem colSpan={3}>
            <Heading as="h4">
              {props.pokemonName.toString().toUpperCase()}
            </Heading>
          </GridItem>
          <Stat>
            <StatLabel>ID</StatLabel>
            <StatNumber># {props.id}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Height</StatLabel>
            <StatNumber>{props.height}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Weight</StatLabel>
            <StatNumber>{props.weight}</StatNumber>
          </Stat>
          {props.caughtDate && (
            <GridItem colSpan={3}>
              <Text color="blue">Caught at {props.caughtDate}</Text>
            </GridItem>
          )}
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

const MovesList = (props) => {
  return (
    <Container display="flex" flexDirection="column" textAlign="center">
      <Heading p={5}>Moves List</Heading>

      <SimpleGrid
        marginInline={3}
        columns={3}
        spacing={5}
        alignItems="center"
        maxHeight="200px"
        overflowY="scroll"
        className="no-scrollbar"
      >
        {props.moves.length === 0 ? (
          <GridItem colSpan={3}>
            <ErrorAlert errorTitle="Data Empty" />
          </GridItem>
        ) : (
          props.moves.map((item, index) => (
            <Tag
              key={index}
              variant="subtle"
              size="sm"
              p={2}
              colorScheme="blue"
            >
              <TagLabel fontSize={18} textTransform="capitalize">
                {item.move.name}
              </TagLabel>
            </Tag>
          ))
        )}
      </SimpleGrid>
    </Container>
  );
};

function DetailsBox(props) {
  return (
    <React.Fragment>
      <CommonInfo {...props} />
      <MovesList {...props} />
    </React.Fragment>
  );
}

export default DetailsBox;
