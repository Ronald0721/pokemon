import React, { Component } from "react";
import { Box, Grid, Paper, TextField } from "@material-ui/core";
import {
  createStyles,
  WithStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import debounce from "lodash.debounce";
import pokemonLogo from "../../assets/images/pokemon.png";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      background: "#E3350D",
      padding: "10px",
    },
    logoBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    logo: {
      width: "100%",
      maxWidth: 180,
    },
  });

// Props
interface Props {
  onSearch: Function;
}

// State
interface S {
  pokemonQuery: string;
}

interface Props extends WithStyles<typeof styles> {}

class Search extends Component<Props, S> {
  private debouncedSearch: (query: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      pokemonQuery: "",
    };

    this.debouncedSearch = debounce(this.handleSearch, 1000);
  }

  handleSearch = (query: string) => {
    this.props.onSearch(query);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    this.setState({ pokemonQuery: query });
    this.debouncedSearch(query.toLowerCase());
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Box className={classes.logoBox}>
            <img
              className={classes.logo}
              src={pokemonLogo}
              alt="pokemon_logo"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              placeholder="Search…"
              variant="outlined"
              value={this.state.pokemonQuery}
              onChange={this.handleChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Search);
