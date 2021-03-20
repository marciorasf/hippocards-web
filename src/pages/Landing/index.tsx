import React from "react";
import { Link } from "react-router-dom";

import { Button, Grid } from "@material-ui/core";

import authService from "../../services/auth";

type LandingProps = {};

const Landing: React.FC<LandingProps> = () => {
  function handleLogout() {
    authService.logout();
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button component={Link} to="/register">
          Register
        </Button>
      </Grid>

      <Grid item>
        <Button component={Link} to="/login">
          Login
        </Button>
      </Grid>

      <Grid item>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Landing;
