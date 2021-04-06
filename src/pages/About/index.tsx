import React from "react"

import { Header, PageContentContainer } from "@components"
import { Grid, Typography } from "@material-ui/core"

const About: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Typography variant="h3">About</Typography>
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default About
