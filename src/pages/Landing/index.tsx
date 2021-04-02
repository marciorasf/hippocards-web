import React from "react"
import { Link } from "react-router-dom"

import { Header } from "@components"
import { Button, Grid, Typography } from "@material-ui/core"
import authService from "@services/auth"
import errorService from "@services/error"

const Landing: React.FC = () => {
  async function handleLogout() {
    try {
      await authService.logout()
    } catch (err) {
      errorService.handle(err)
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Landing</Typography>
          </Grid>

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

          <Grid item>
            <Button component={Link} to="/categories">
              Categories
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Landing
