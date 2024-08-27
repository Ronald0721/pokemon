import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getPokemon } from "../../services/getPokemons";
import { getPokemonSpecies } from "../../services/getPokemonSpecies";
import getPokemonTypeColor from "../../services/getPokemonTypeColor";
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { PokemonTypeChip } from "../../components";
import { PokemonDetails, TextEntry } from "../../types/pokemonTypes";

interface RouteParams {
  id: string;
}

// Props
interface Props extends RouteComponentProps<RouteParams> {}

// State
interface S {
  loading: boolean;
  error: string | null | unknown;
  pokemon: PokemonDetails;
  species: {
    flavor_text_entries: TextEntry[];
  };
}

export class PokemonView extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      pokemon: {
        name: "",
        height: "",
        sprites: {
          front_default: "",
        },
        species: {
          name: "",
          url: "",
        },
        types: [],
        stats: [],
      },
      species: {
        flavor_text_entries: [
          {
            flavor_text: "",
            language: {
              name: "",
              url: "",
            },
          },
        ],
      },
    };
  }

  async componentDidMount() {
    await this.fetchPokemon();
    await this.fetchSpecies();
  }

  fetchPokemon = async () => {
    try {
      const pokemon = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
      );
      this.setState({ pokemon, error: null });
    } catch (err: unknown) {
      console.error("Failed to fetch pokemon:", err);
      this.setState({ error: err });
    }
  };

  fetchSpecies = async () => {
    try {
      const species = await getPokemonSpecies(this.state.pokemon.species.url);
      this.setState({ loading: false, species });
    } catch (err) {
      console.error("Failed to fetch species:", err);
      this.setState({ error: err });
    }
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { pokemon, species } = this.state;

    return (
      <Container>
        <ArrowBackIcon onClick={this.handleGoBack} />
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <Box>
              <img
                className="pokemon-img"
                alt={pokemon.name}
                src={pokemon.sprites.front_default}
              ></img>
            </Box>
            <Typography className="pokemon-name" component="h1">
              {pokemon.name}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Paper>
              <Box>
                <Typography className="pokemon-flavor_text" component="p">
                  {species.flavor_text_entries[0].flavor_text}
                </Typography>

                <Typography component="h2">Pokemon Type</Typography>
                {pokemon.types.map((type, index) => (
                  <PokemonTypeChip
                    size="small"
                    key={index}
                    label={type.type.name}
                    color={getPokemonTypeColor(type.type.name)}
                  />
                ))}

                <Grid container>
                  {pokemon.stats.map((stat, index) => (
                    <Grid xs={6} item key={index}>
                      <Typography component="span">
                        {stat.stat.name}:&nbsp;
                      </Typography>
                      <Typography component="span">{stat.base_stat}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(PokemonView);
