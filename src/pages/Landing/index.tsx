import React from "react"
import { Link } from "react-router-dom"

import landingImage from "@assets/images/book-lover-animate.svg"
import { Header, PageContentContainer, Spacing } from "@components"
import {
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core"

const Landing: React.FC = () => {
  const theme = useTheme()
  const widthSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <Header isLandingPage />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Grid container style={{ marginTop: "-32px" }} spacing={4}>
            <Grid item md="auto" xs={12}>
              {widthSmallerThanMd ? (
                <>
                  <Spacing orientation="horizontal" size={6} />

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    flexDirection="column"
                  >
                    <Box>
                      <Typography variant="h2" color="primary" align="center">
                        Hippocards
                      </Typography>

                      <Spacing orientation="horizontal" size={4} />

                      <Typography variant="h5" align="center">
                        Study more efficiently
                      </Typography>

                      <Spacing orientation="horizontal" size={4} />

                      <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        component={Link}
                        to="/signup"
                        style={{ textAlign: "center" }}
                      >
                        Start Now
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-start"
                  height="100%"
                  flexDirection="column"
                >
                  <Typography variant="h2" color="primary">
                    Hippocards
                  </Typography>

                  <Spacing orientation="horizontal" size={4} />

                  <Typography variant="h5">Study more efficiently</Typography>

                  <Spacing orientation="horizontal" size={4} />

                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to="/signup"
                  >
                    Start Now
                  </Button>
                </Box>
              )}
            </Grid>

            <Grid item md xs={12}>
              <Box display="flex" justifyContent="center" position="relative">
                <img src={landingImage} alt="landing_image" />

                <Box position="absolute" bottom="0" right="0">
                  <MuiLink component={Link} to="https://storyset.com/education">
                    Illustration by Freepik Storyset
                  </MuiLink>
                </Box>
              </Box>
            </Grid>

            {widthSmallerThanMd && (
              <Spacing orientation="horizontal" size={1} />
            )}
          </Grid>
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Landing
