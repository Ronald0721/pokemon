import { Chip } from "@material-ui/core";
import React, { Component } from "react";

// Props
interface Props {
  label: string;
  color: string;
  size: "small" | "medium";
}

// State
interface S {}

class PokemonTypeChip extends Component<Props, S> {
  render() {
    const { label, color, size } = this.props;

    return (
      <>
        <Chip
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          style={{ background: color, color: "#fff", marginRight: "2px" }}
          size={size}
        />
      </>
    );
  }
}

export default PokemonTypeChip;
