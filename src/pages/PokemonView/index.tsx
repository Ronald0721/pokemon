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
      console.log(this.props.match.params.id, "paramsId");
      const pokemon = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
      );
      console.log(pokemon, "fetchPoke");
      this.setState({ pokemon });
    } catch (err) {
      console.error("Failed to fetch pokemon:", err);
    }
  };

  fetchSpecies = async () => {
    try {
      console.log(this.state.pokemon.species.url, "specURL");
      const species = await getPokemonSpecies(this.state.pokemon.species.url);
      console.log(species, "fetchSpe");
      this.setState({ loading: false, species });
    } catch (err) {
      console.error("Failed to fetch species:", err);
    }
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { pokemon, species } = this.state;
    console.log(pokemon, "compokemon");
    console.log(species, "comspecies");

    return (
      <Container>
        <ArrowBackIcon onClick={this.handleGoBack} />
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <Box>
              <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
            </Box>
            <Typography component="h1">{pokemon.name}</Typography>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Paper>
              <Box>
                <Typography component="p">
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
