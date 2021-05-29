import React from "react"
import { Link } from "react-router-dom"

import logoImg from "@assets/images/logo.png"
import Spacing from "@components/Spacing"
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"
import authService from "@services/auth"
import errorService from "@services/error"
import { useUserStore } from "@stores/user"

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "100%",
  },
  logo: {
    height: 32,
  },
  brandButton: {
    padding: theme.spacing(1, 4),
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: theme.spacing(1),
  },
}))

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const classes = useStyles()
  const userStore = useUserStore()

  const isLoggedIn = Boolean(userStore.user.id)

  async function handleLogout() {
    try {
      await authService.logout()
      window.location.href = "/"
    } catch (err) {
      errorService.handle(err)
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Box>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button
                fullWidth
                className={classes.brandButton}
                component={Link}
                to="/categories"
                onClick={onClose}
              >
                <img src={logoImg} alt="logo" className={classes.logo} />

                <Spacing orientation="vertical" size={2} />

                <Typography variant="h6">Hippocards</Typography>
              </Button>
            </Grid>

            <Grid item>
              <Spacing orientation="horizontal" size={1} />
              <Divider light />
              <Spacing orientation="horizontal" size={1} />
            </Grid>

            <Grid item>
              <Button
                fullWidth
                component={Link}
                to="/categories"
                onClick={onClose}
              >
                Categories
              </Button>
            </Grid>

            {/* <Grid item>
              <Button fullWidth component={Link} to="/about" onClick={onClose}>
                About
              </Button>
            </Grid> */}

            {isLoggedIn ? (
              <Grid item>
                <Button
                  fullWidth
                  onClick={handleLogout}
                  variant="outlined"
                  color="primary"
                >
                  Log out
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Button
                    fullWidth
                    component={Link}
                    to="/login"
                    variant="outlined"
                    color="primary"
                  >
                    Log in
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    fullWidth
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="primary"
                  >
                    sign up
                  </Button>
                </Grid>
              </>
            )}

            <Grid item>
              <Box display="flex" justifyContent="center">
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
