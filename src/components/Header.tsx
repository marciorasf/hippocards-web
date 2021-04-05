import React, { useState } from "react"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"

import Sidebar from "./Sidebar"

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
  },
}))

const Header: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const classes = useStyles()

  function handleOpenSidebar() {
    setOpenSidebar(true)
  }

  function handleCloseSidebar() {
    setOpenSidebar(false)
  }

  return (
    <>
      <AppBar position="static" color="secondary" className={classes.appBar}>
        <Toolbar disableGutters>
          <Container maxWidth="md">
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <IconButton
                  edge="start"
                  onClick={handleOpenSidebar}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <Typography variant="h6">Flashcards</Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />
    </>
  )
}

export default Header
