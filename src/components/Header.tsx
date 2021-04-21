import React, { SyntheticEvent, useEffect, useState } from "react"
import { useResizeDetector } from "react-resize-detector"
import { Link } from "react-router-dom"

import Spacing from "@components/Spacing"
import useIsMobile from "@hooks/useIsMobile"
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
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
} from "@material-ui/core"
import {
  MoreVert as SettingsIcon,
  ChevronLeft as BackIcon,
  Add as AddIcon,
  ExitToApp as LogoutIcon,
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
  fab: {
    position: "absolute",
    top: "100%",
    transform: "translateY(-50%)",
    right: 16,
  },
}))

type HeaderProps = {
  title?: string
  goBackTo?: string
  fabFn?: () => void
  children?: React.ReactNode
  isLandingPage?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  goBackTo,
  fabFn,
  children,
  isLandingPage,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<(EventTarget & Element) | null>(
    null
  )
  const isMobile = useIsMobile()
  const userStore = useUserStore()

  const { height: headerHeight, ref: headerRef } = useResizeDetector()

  let defaultHeight = 52
  if (!isLandingPage) {
    if (isMobile) {
      defaultHeight = 163
    } else {
      defaultHeight = 212
    }
  }

  const classes = useStyles({
    hasFab: Boolean(fabFn),
    headerHeight: headerHeight || defaultHeight,
  })

  function handleCloseMenu() {
    setMenuAnchor(null)
  }

  function handleOpenMenu(event: SyntheticEvent) {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  async function handleLogout() {
    try {
      await authService.logout()
      window.location.href = "/welcome"
    } catch (err) {
      errorService.handle(err)
    }
  }

  useEffect(() => {
    console.log(headerHeight)
  }, [headerHeight])

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
        // onAnimationEnd={resizeHeight}
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
                      {userStore.user.id ? "My Categories" : "Login"}
                    </Button>
                  ) : (
                    <IconButton onClick={handleOpenMenu} color="inherit">
                      <SettingsIcon />
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

      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default Header
