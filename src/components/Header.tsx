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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

type HeaderProps = {
  title?: string
  rightSideComponent?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, rightSideComponent }) => {
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
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      onClick={handleOpenSidebar}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>

                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      {title || "Flashcards"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>{rightSideComponent}</Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />
    </>
  )
}

export default Header
