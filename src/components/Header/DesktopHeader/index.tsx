import React from "react"
import { useResizeDetector } from "react-resize-detector"
import { Link } from "react-router-dom"

import logoImg from "@assets/images/lightning.png"
import { Spacing } from "@components"
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Container,
  Fab,
  Theme,
  Button,
  Box,
} from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import authService from "@services/auth"
import errorService from "@services/error"
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
  logo: {
    height: 32,
  },
  fab: {
    position: "absolute",
    top: "100%",
    transform: "translateY(-50%)",
    right: 24,
  },
}))

type DesktopHeaderProps = {
  title?: string
  fabFn?: () => void
  children?: React.ReactNode
  isLandingPage?: boolean
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  fabFn,
  children,
  isLandingPage,
  title,
}) => {
  const userStore = useUserStore()

  const { height: headerHeight, ref: headerRef } = useResizeDetector()

  const defaultHeight = isLandingPage ? 61 : 217

  async function handleLogout() {
    try {
      await authService.logout()
      window.location.href = "/"
    } catch (err) {
      errorService.handle(err)
    }
  }

  const classes = useStyles({
    hasFab: Boolean(fabFn),
    headerHeight: headerHeight || defaultHeight,
  })

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
            <Spacing orientation="horizontal" size={1} />

            <Container maxWidth={false}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                  <Box display="flex" alignItems="center">
                    <img src={logoImg} alt="logo" className={classes.logo} />

                    <Spacing orientation="vertical" size={2} />

                    <Typography variant="h5">
                      {title || "Flashcards"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button component={Link} to="/categories">
                        Categories
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button component={Link} to="/about">
                        About
                      </Button>
                    </Grid>

                    <Grid item>
                      {userStore.user.id ? (
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          component={Link}
                          to="/login"
                        >
                          Login
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>

            {children && (
              <>
                <Spacing orientation="horizontal" size={3} />

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
    </Container>
  )
}

export default DesktopHeader
