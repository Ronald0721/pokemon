import React, { Component } from "react";
import { PokemonList, SearchBar } from "../../components";
import { getPokemon, getPokemons } from "../../services/getPokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container } from "@material-ui/core";
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
    };
  }

  async componentDidMount() {
    await this.fetchPokemons();
  }

  componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.pokemonQuery !== this.state.pokemonQuery) {
      this.fetchPokemons();
    }
  }

  fetchPokemons = async () => {
    const { pokemonList, limit, offset, pokemonQuery } = this.state;

    try {
      this.setState({ loading: true });
      if (pokemonQuery) {
        const pokemon = await getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`
        );
        console.log(pokemon);
        this.setState({
          pokemonList: [pokemon],
          loading: false,
          hasMore: false,
        });
      } else {
        if (pokemonList.length === 1) this.setState({ pokemonList: [] });
        const { pokemons, hasMore } = await getPokemons(limit, offset);
        console.log(pokemons, hasMore);
        this.setState((prevState) => ({
          pokemonList: [...prevState.pokemonList, ...pokemons],
          loading: false,
          hasMore,
          offset: prevState.offset + limit,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch pokemons:", err);
      this.setState({ loading: false });
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
    const { pokemonList, hasMore } = this.state;
    const loader = <h1>...</h1>;

    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <Container maxWidth="xl">
          <InfiniteScroll
            dataLength={pokemonList.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={loader}
          >
            <PokemonList pokemons={pokemonList} />
          </InfiniteScroll>
        </Container>
      </>
    );
  }
}

export default Home;
