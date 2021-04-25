import React, { useState } from "react"
import { useResizeDetector } from "react-resize-detector"
import { Link } from "react-router-dom"

import { Spacing } from "@components"
import Sidebar from "@components/Header/MobileHeader/Sidebar"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Container,
  Fab,
  Theme,
  Button,
  Box,
} from "@material-ui/core"
import {
  ChevronLeft as BackIcon,
  Add as AddIcon,
  Menu as MenuIcon,
} from "@material-ui/icons"
import { useUserStore } from "@stores/user"

type MakeStylesProps = {
  hasFab: boolean
  headerHeight: number
}
const useStyles = makeStyles<Theme, MakeStylesProps>((theme) => ({
  headerContainer: {
    marginBottom: ({ headerHeight, hasFab }) =>
      headerHeight + (hasFab ? theme.spacing(6) : theme.spacing(4)),
  },
  appBar: {
    backgroundColor: theme.palette.header.main,
  },
  container: {
    padding: theme.spacing(1, 0),
    position: "relative",
  },
  fab: {
    position: "absolute",
    top: "100%",
    transform: "translateY(-50%)",
    right: 16,
  },
}))

type MobileHeaderProps = {
  title?: string
  goBackTo?: string
  fabFn?: () => void
  children?: React.ReactNode
  isLandingPage?: boolean
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  goBackTo,
  fabFn,
  children,
  isLandingPage,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const userStore = useUserStore()

  const { height: headerHeight, ref: headerRef } = useResizeDetector()

  const defaultHeight = isLandingPage ? 61 : 163

  const classes = useStyles({
    hasFab: Boolean(fabFn),
    headerHeight: headerHeight || defaultHeight,
  })

  function handleCloseSidebar() {
    setOpenSidebar(false)
  }

  function handleOpenSidebar() {
    setOpenSidebar(true)
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      className={classes.headerContainer}
    >
      <AppBar
        position="fixed"
        className={classes.appBar}
        ref={headerRef}
        elevation={4}
      >
        <Toolbar disableGutters>
          <Container maxWidth="md" disableGutters className={classes.container}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={3}>
                {goBackTo && (
                  <IconButton component={Link} to={goBackTo}>
                    <BackIcon />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h5" align="center">
                  {title || "Flashcards"}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  paddingRight={isLandingPage ? 1 : 0}
                >
                  {isLandingPage ? (
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/login"
                    >
                      {userStore.user.id ? "Start" : "Login"}
                    </Button>
                  ) : (
                    <IconButton onClick={handleOpenSidebar} color="inherit">
                      <MenuIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>

            {children && (
              <>
                <Spacing orientation="horizontal" size={2} />

                <Container>{children}</Container>

                <Spacing orientation="horizontal" size={2} />
              </>
            )}

            {fabFn && (
              <>
                <Spacing orientation="horizontal" size={3} />

                <Fab
                  variant="extended"
                  color="secondary"
                  className={classes.fab}
                  onClick={fabFn}
                >
                  <AddIcon />
                  <Spacing orientation="vertical" size={1} />
                  Add
                </Fab>
              </>
            )}
          </Container>
        </Toolbar>
      </AppBar>

      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />
    </Container>
  )
}

export default MobileHeader
