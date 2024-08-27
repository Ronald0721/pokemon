import React, { Component } from "react";
import { PokemonList, SearchBar } from "../../components";
import { getPokemon, getPokemons } from "../../services/getPokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Container, Typography } from "@material-ui/core";
import { Pokemon } from "../../types/pokemonTypes";

// Props
interface Props {}

// State
interface S {
  pokemonQuery: string;
  pokemonList: Pokemon[];
  loading: boolean;
  hasMore: boolean;
  limit: number;
  offset: number;
  error: string | null | unknown;
}
class Home extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemonQuery: "",
      pokemonList: [],
      loading: false,
      hasMore: true,
      limit: 24,
      offset: 0,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.pokemonQuery !== this.state.pokemonQuery) {
      this.fetchPokemons();
    }
  }

  fetchPokemons = async () => {
    const { pokemonList, limit, offset, pokemonQuery } = this.state;

    try {
      this.setState({ pokemonList: [], loading: true });
      if (pokemonQuery) {
        const pokemon = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`
        );
        this.setState({
          pokemonList: [pokemon],
          loading: false,
          hasMore: false,
        });
      } else {
        if (pokemonList.length === 1) this.setState({ pokemonList: [] });
        const { pokemons, hasMore } = await getPokemons(limit, offset);
        this.setState((prevState) => ({
          pokemonList: [...prevState.pokemonList, ...pokemons],
          loading: false,
          hasMore,
          offset: prevState.offset + limit,
        }));
      }
    } catch (err) {
      this.setState({
        pokemonList: [],
        loading: false,
        error: err,
      });
    }
  };

  handleSearch = (q: string) => {
    this.setState({ pokemonQuery: q, offset: 0 });
  };

  fetchMoreData = async () => {
    if (this.state.hasMore) {
      await this.fetchPokemons();
    }
  };

  render() {
    const { pokemonList, hasMore, error } = this.state;
    const loader = <h1>...</h1>;

    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <Container maxWidth="xl">
          {error ? (
            <Box>
              <Typography className="error-message" align="center">
                Oops! We couldn't find a Pokemon by that name.
              </Typography>
            </Box>
          ) : (
            <InfiniteScroll
              dataLength={pokemonList.length}
              next={this.fetchMoreData}
              hasMore={hasMore}
              loader={loader}
            >
              <PokemonList pokemons={pokemonList} />
            </InfiniteScroll>
          )}
        </Container>
      </>
    );
  }
}

export default Home;
