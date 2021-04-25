import React from "react"
import { Link } from "react-router-dom"

import logoImg from "@assets/images/lightning.png"
import Spacing from "@components/Spacing"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import {
  FolderOutlined as CategoryIcon,
  ExitToApp as LogoutIcon,
  InfoOutlined as AboutIcon,
  Close as CloseIcon,
} from "@material-ui/icons"
import authService from "@services/auth"
import errorService from "@services/error"

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: "100%",
  },
  logo: {
    height: 40,
  },
  list: {
    width: "100%",
  },
  brandName: {
    flex: 1,
  },
}))

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const classes = useStyles()

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
      <Box display="flex" alignItems="center" my={3} mx={2}>
        <img src={logoImg} alt="logo" className={classes.logo} />

        <Spacing orientation="vertical" size={2} />

        <Typography variant="h5">Flashcards</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider variant="middle" light />

      <List className={classes.list}>
        <ListItem component={Link} to="/categories" button onClick={onClose}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>

          <ListItemText primary="Categories" />
        </ListItem>

        <ListItem component={Link} to="/about" button onClick={onClose}>
          <ListItemIcon>
            <AboutIcon />
          </ListItemIcon>

          <ListItemText primary="About" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
