import React from "react"
import { Link } from "react-router-dom"

import landingImage from "@assets/images/book-lover-animate.svg"
import { Header, PageContentContainer, Spacing } from "@components"
import { Box, Grid, Typography, Link as MuiLink } from "@material-ui/core"

const Landing: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header isLandingPage />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Grid container>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="center"
                height="100%"
                flexDirection="column"
              >
                <Typography variant="h2" color="primary">
                  Hippocards
                </Typography>

                <Spacing orientation="horizontal" size={4} />

                <Typography variant="h5">Study more efficiently</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" justifyContent="center" position="relative">
                <img src={landingImage} alt="under construction" height={500} />

                <Box position="absolute" bottom="0" right="0">
                  <MuiLink component={Link} to="https://storyset.com/education">
                    Illustration by Freepik Storyset
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Landing
