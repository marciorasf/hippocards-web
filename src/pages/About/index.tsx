import React from "react"

import { Header } from "@components"
import { Grid } from "@material-ui/core"

const About: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        About
      </Grid>
    </Grid>
  )
}

export default About
