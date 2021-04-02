import React, { useState } from "react"
import { Link } from "react-router-dom"

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { Menu as MenuIcon } from "@material-ui/icons"
import authService from "@services/auth"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

import Sidebar from "./Sidebar"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const classes = useStyles()
  const userStore = useUserStore()

  function handleOpenSidebar() {
    setOpenSidebar(true)
  }

  function handleCloseSidebar() {
    setOpenSidebar(false)
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={handleOpenSidebar}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          {userStore.user.id ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Sidebar open={openSidebar} onClose={handleCloseSidebar} />
    </>
  )
}

export default Header
