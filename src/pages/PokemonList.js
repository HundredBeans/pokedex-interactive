import React from "react";
// import { DefaultContext } from "../context/DefaultContext";
import { useQuery } from "@apollo/client";
import { fetchPokemonListQuery } from "../helpers/query";
import Loader from "../components/Loader";
import ListCard from "../components/ListCard";
import { GridItem, SimpleGrid, Container } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function PokemonList() {
  const history = useHistory();
  // const { db } = useContext(DefaultContext);
  let { loading, data } = useQuery(fetchPokemonListQuery, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });
  // let [pokemonData, setPokemonData] = useState([]);
  // setPokemonData(data);
  if (!loading) {
    // return <Loader loadingText="Fetching Data" />;
    // if (error) return <p>Error : {error}</p>;
    // db.collection("caughtPokemon")
    //   .get()
    //   .then((result) => {
    //     console.log("result", result);
    //     data.pokemons.results.map((pokemon) => {
    //       let count = 0;
    //       result.forEach((item) => {
    //         if (item.name === pokemon.name) {
    //           count += 1;
    //         }
    //       });

    //       return { ...pokemon, owned: count };
    //     });
    //   });

    return (
      <Container maxWidth="container.md">
        <SimpleGrid minChildWidth="150px" spacing="40px" py={7}>
          {data.pokemons.results.map((item) => (
            <GridItem key={item.name}>
              <ListCard
                name={item.name}
                imageSrc={item.image}
                owned={item.owned}
                onClickCard={() => history.push(`/pokemons/${item.name}`)}
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    );
  } else {
    return <Loader loadingText="Fetching Data" />;
  }
}

export default PokemonList;
