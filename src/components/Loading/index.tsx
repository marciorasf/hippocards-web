import React from "react";

import { CircularProgress, Grid, Fade } from "@material-ui/core";

import useStyles from "./styles";

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = (props) => {
  const { children, loading } = props;

  const classes = useStyles();

  let component;

  if (loading) {
    component = (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <CircularProgress color="secondary" />
      </Grid>
    );
  } else {
    component = <Fade in={!loading}>{children as React.ReactElement}</Fade>;
  }

  return component as React.ReactElement;
};

export default Loading;
