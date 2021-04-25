import React from "react"

import { Header, PageContentContainer } from "@components"
import { Typography, Grid } from "@material-ui/core"

const About: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title="About" />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Typography variant="h2">About</Typography>
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default About
