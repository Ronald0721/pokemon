import { Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { PokemonCard } from "../index";
import { Pokemon } from "../../types/pokemonTypes";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      overflow: "hidden",
      marginTop: "20px",
    },
    control: {
      padding: theme.spacing(1),
    },
  });

// Props
interface Props extends WithStyles<typeof styles> {
  pokemons: Pokemon[];
}

// State
interface S {}

class PokemonList extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemons: [],
      loading: false,
      hasMore: true,
      fetchMoreData: () => {},
      limit: 24,
    };
  }

  render() {
    const { classes, pokemons } = this.props;

    return (
      <Box className={classes.root}>
        <Grid container spacing={1} justifyContent="space-evenly">
          {pokemons.map((pokemon: Pokemon, index) => (
            <Grid key={index} item xs={6} sm={3} md={3} lg={2}>
              <PokemonCard pokemonQuery={pokemon.name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(PokemonList);
