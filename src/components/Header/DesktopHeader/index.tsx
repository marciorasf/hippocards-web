import React from "react"
import { useResizeDetector } from "react-resize-detector"
import { Link } from "react-router-dom"

import logoImg from "@assets/images/logo.png"
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
  IconButton,
} from "@material-ui/core"
import {
  Add as AddIcon,
  ArrowBackIosOutlined as BackIcon,
} from "@material-ui/icons"
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
  titleRowContainer: {
    minHeight: 48,
    display: "flex",
    alignItems: "center",
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
  goBackTo?: string
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  fabFn,
  children,
  isLandingPage,
  title,
  goBackTo,
}) => {
  const userStore = useUserStore()

  const isLoggedIn = Boolean(userStore.user.id)

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
            <Container maxWidth={false} className={classes.titleRowContainer}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs>
                  <Box display="flex" alignItems="center">
                    {goBackTo ? (
                      <IconButton component={Link} to={goBackTo}>
                        <BackIcon />
                      </IconButton>
                    ) : (
                      <img src={logoImg} alt="logo" className={classes.logo} />
                    )}

                    <Spacing orientation="vertical" size={2} />

                    <Typography variant="h5">
                      {title || "Hippocards"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    {isLoggedIn && (
                      <Grid item>
                        <Button component={Link} to="/categories">
                          Categories
                        </Button>
                      </Grid>
                    )}

                    {/* <Grid item>
                      <Button component={Link} to="/about">
                        About
                      </Button>
                    </Grid> */}

                    {isLoggedIn ? (
                      <Grid item>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={handleLogout}
                        >
                          Log out
                        </Button>
                      </Grid>
                    ) : (
                      <>
                        <Grid item>
                          <Button
                            color="primary"
                            variant="outlined"
                            component={Link}
                            to="/login"
                          >
                            Log in
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button
                            color="primary"
                            variant="contained"
                            component={Link}
                            to="/signup"
                          >
                            sign up
                          </Button>
                        </Grid>
                      </>
                    )}
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
