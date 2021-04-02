import React from "react"
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

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Header: React.FC = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button component={Link} to="/register" color="inherit">
          Register
        </Button>
        <Button component={Link} to="/categories" color="inherit">
          Categories
        </Button>
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
