import React, { SyntheticEvent, useState } from "react"
import { Link } from "react-router-dom"

import Spacing from "@components/Spacing"
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
} from "@material-ui/core"
import {
  MoreVert as SettingsIcon,
  ChevronLeft as BackIcon,
  Add as AddIcon,
  ExitToApp as LogoutIcon,
} from "@material-ui/icons"
import authService from "@services/auth"
import errorService from "@services/error"

type MakeStylesProps = {
  hasFab: boolean
}
const useStyles = makeStyles<Theme, MakeStylesProps>((theme) => ({
  appBar: {
    marginBottom: (props) =>
      props.hasFab ? theme.spacing(6) : theme.spacing(4),
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
  const [menuAnchor, setMenuAnchor] = useState<(EventTarget & Element) | null>(
    null
  )
  const classes = useStyles({ hasFab: Boolean(fabFn) })

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
      window.location.href = "/"
    } catch (err) {
      errorService.handle(err)
    }
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
                <IconButton onClick={handleOpenMenu} color="inherit">
                  <SettingsIcon />
                </IconButton>
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

                <Fab color="secondary" className={classes.fab} onClick={fabFn}>
                  <AddIcon />
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
    </>
  )
}

export default Header
