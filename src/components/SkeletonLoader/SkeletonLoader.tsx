import React, { Component } from "react";
import { Skeleton } from "@material-ui/lab";
import { Box, Grid } from "@material-ui/core";

// Props
interface Props {
  variant?: "text" | "rect" | "circle";
  width?: number | string;
  height?: number | string;
  count?: number;
}

// State
interface S {
  sampleStateNumber: number;
}

class SkeletonLoader extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sampleStateNumber: 0,
    };
  }
  render() {
    const { variant, width, height, count } = this.props;

    return (
      <Box>
        <Grid container spacing={1}>
          {[...Array(count)].map((_, index) => (
            <Grid key={index} item xs={12} sm={3} md={3} lg={2}>
              <Skeleton
                key={index}
                variant={variant}
                width={width}
                height={height}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default SkeletonLoader;
