import React from "react"

import { CircularProgress, Grid, Fade, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
})

type LoadingProps = {
  loading: boolean
  customLoadingElement?: React.ReactNode
}

const Loading: React.FC<LoadingProps> = ({
  children,
  loading,
  customLoadingElement,
}) => {
  const classes = useStyles()

  let component

  if (loading) {
    if (customLoadingElement) {
      component = customLoadingElement
    } else {
      component = (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <CircularProgress color="secondary" />
        </Grid>
      )
    }
  } else {
    component = <Fade in={!loading}>{children as React.ReactElement}</Fade>
  }

  return component as React.ReactElement
}

export default Loading
