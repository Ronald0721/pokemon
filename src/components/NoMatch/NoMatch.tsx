import { Button, Container, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NoMatch extends Component {
  render() {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist.
        </Typography>
        <Button size="small" component={Link} to="/" variant="outlined">
          Go to Home
        </Button>
      </Container>
    );
  }
}
