import React from "react"

import underConstructionImg from "@assets/images/under-construction.svg"
import { Header, PageContentContainer, Spacing } from "@components"
import { Box, Grid, Typography } from "@material-ui/core"

const Landing: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header isLandingPage />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Typography variant="h3">Coming soon...</Typography>

          <Spacing orientation="horizontal" size={8} />

          <Box display="flex" justifyContent="center">
            <img
              src={underConstructionImg}
              alt="under construction"
              height={300}
            />
          </Box>
        </PageContentContainer>
      </Grid>
    </Grid> 
  )
}

export default Landing
