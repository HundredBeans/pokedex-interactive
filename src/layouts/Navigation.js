import React from "react";
import {
  Flex,
  Box,
  Heading,
  Link,
  useColorModeValue,
  useBreakpointValue,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory, matchPath } from "react-router-dom";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import HeaderLogo from "../components/HeaderLogo";
import { CgPokemon, CgList } from "react-icons/cg";
import BackButton from "../components/BackButton";

function Navigation(props) {
  const navColor = useColorModeValue("#FAF5FF", "#1A202C");
  const isMd = useBreakpointValue({ base: true, md: false });
  const history = useHistory();
  const match =
    matchPath(history.location.pathname, {
      path: "/pokemons/:id",
      exact: true,
      strict: false,
    }) ||
    matchPath(history.location.pathname, {
      path: "/my-pokemons/:id",
      exact: true,
      strict: false,
    });

  return (
    <React.Fragment>
      {/* Top Navigation */}
      <header>
        <Flex
          justifyContent="space-between"
          p="4"
          position="fixed"
          height={props.headerHeight}
          width="100vw"
          shadow="lg"
          zIndex="banner"
          background={navColor}
        >
          {match ? (
            <Box d="flex" alignItems="center" justifyContent="center">
              <BackButton />
              <Tooltip
                label={match.params.id.toString().toUpperCase()}
                aria-label="Pokemon Name"
              >
                <Heading pl={2} size="lg" isTruncated={true} maxWidth="60vw">
                  {match.params.id.toString().toUpperCase()}
                </Heading>
              </Tooltip>
            </Box>
          ) : (
            <HeaderLogo />
          )}
          <Flex align="center" justify="center" justifyContent="space-between">
            {!isMd ? (
              <React.Fragment>
                <Link as={RouterLink} to="/pokemons" _hover="none">
                  <Heading _hover={{ opacity: 0.5 }} p={5} fontSize="lg">
                    Pokemons List
                  </Heading>
                </Link>
                <Link as={RouterLink} to="/my-pokemons" _hover="none">
                  <Heading _hover={{ opacity: 0.5 }} p={5} fontSize="lg">
                    My Pokemons
                  </Heading>
                </Link>
              </React.Fragment>
            ) : (
              ""
            )}
            <Box>
              <ColorModeSwitcher></ColorModeSwitcher>
            </Box>
          </Flex>
        </Flex>
      </header>
      {/* Bottom Navigation */}
      <Box
        bottom="0"
        position="fixed"
        width="100%"
        background={navColor}
        zIndex="banner"
        shadow="lg"
        height="70px"
        py={3}
        display={!isMd ? "none" : ""}
      >
        <Flex justifyContent="space-around">
          <Link as={RouterLink} _active={{ color: "green" }} to="/pokemons">
            <Icon fontSize="5xl" as={CgList} />
          </Link>
          <Link
            as={RouterLink}
            _activeLink={{ opacity: 0.5 }}
            to="/my-pokemons"
          >
            <Icon fontSize="5xl" as={CgPokemon} />
          </Link>
        </Flex>
      </Box>
    </React.Fragment>
  );
}

export default Navigation;
