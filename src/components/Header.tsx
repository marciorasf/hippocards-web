import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Container,
  Fab,
} from "@material-ui/core"
import {
  MoreVert as SettingsIcon,
  ChevronLeft as BackIcon,
  Add as AddIcon,
} from "@material-ui/icons"

import Sidebar from "./Sidebar"
import Spacing from "./Spacing"

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(6),
    backgroundColor: theme.palette.header.main,
  },
  toolbar: {
    position: "relative",
    padding: theme.spacing(1, 0),
  },
  fab: {
    position: "absolute",
    top: "100%",
    transform: "translateY(-50%)",
    marginLeft: theme.spacing(2),
  },
}))

type HeaderProps = {
  title?: string
  goBackTo?: string
  fabFn?: () => void
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({
  title,
  goBackTo,
  fabFn,
  children,
}) => {
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
      <AppBar position="static" className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Container maxWidth="md" disableGutters>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                {goBackTo && (
                  <IconButton component={Link} to={goBackTo}>
                    <BackIcon />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs>
                <Typography variant="h5" align="center">
                  {title || "Flashcards"}
                </Typography>
              </Grid>

              <Grid item>
                <IconButton onClick={handleOpenSidebar} color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Grid>
            </Grid>

            {children && (
              <>
                <Spacing orientation="horizontal" size={3} />

                <Container>{children}</Container>
              </>
            )}

            <Spacing orientation="horizontal" size={fabFn ? 6 : 3} />

            {fabFn && (
              <Fab color="secondary" className={classes.fab} onClick={fabFn}>
                <AddIcon />
              </Fab>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />
    </>
  )
}

export default Header
