import React from "react";
import {
  Flex,
  Box,
  Heading,
  Link,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory, matchPath } from "react-router-dom";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import HeaderLogo from "../components/HeaderLogo";
// import { CgPokemon, CgSearch, CgList } from "react-icons/cg";
import BackButton from "../components/BackButton";

function Navigation(props) {
  const navColor = useColorModeValue("#FAF5FF", "#1A202C");
  const isMd = useBreakpointValue({ base: true, md: false });
  const history = useHistory();
  const match = matchPath(history.location.pathname, {
    path: "/pokemons/:id",
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
              <Heading pl={2} size="lg">
                {match.params.id.toString().toUpperCase()}
              </Heading>
            </Box>
          ) : (
            <HeaderLogo />
          )}
          <Flex align="center" justify="center" justifyContent="space-between">
            {!isMd ? (
              <React.Fragment>
                <Link as={RouterLink} to="/listofall" _hover="none">
                  <Heading _hover={{ opacity: 0.5 }} p={5} fontSize="lg">
                    List of All Pokemons
                  </Heading>
                </Link>
                <Link as={RouterLink} to="/pokedetails" _hover="none">
                  <Heading _hover={{ opacity: 0.5 }} p={5} fontSize="lg">
                    Battle
                  </Heading>
                </Link>
                <Link as={RouterLink} to="/about" _hover="none">
                  <Heading _hover={{ opacity: 0.5 }} p={5} fontSize="lg">
                    About
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
      {/* <Box
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
          <Link as={RouterLink} _active={{ color: "green" }} to="/example">
            <Icon fontSize="5xl" as={CgList} />
          </Link>
          <Link as={RouterLink} _activeLink={{ opacity: 0.5 }} to="/">
            <Icon fontSize="5xl" as={CgPokemon} />
          </Link>
          <Link as={RouterLink} _activeLink={{ opacity: 0.5 }} to="/">
            <Icon fontSize="5xl" as={CgSearch} />
          </Link>
        </Flex>
      </Box> */}
    </React.Fragment>
  );
}

export default Navigation;
