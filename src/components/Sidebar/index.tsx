import React, { useState } from "react"
import { Link } from "react-router-dom"

import useDidMount from "@hooks/useDidMount"
import { Category } from "@interfaces/category"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core"
import {
  FolderOutlined as CategoryIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  TextFieldsOutlined as TypographyIcon,
  PaletteOutlined as PaletteIcon,
  HomeOutlined as HomeIcon,
  ExitToApp as LogoutIcon,
  LocalGasStation as LoginIcon,
  HttpsTwoTone as SignUpIcon,
} from "@material-ui/icons"
import authService from "@services/auth"
import categoryService from "@services/category"
import errorService from "@services/error"

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
}))

type SidebarProps = {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [openCategories, setOpenCategories] = useState(false)
  const classes = useStyles()

  async function getAndUpdateCategories() {
    try {
      const cat = await categoryService.retrieveAll()
      setCategories(cat)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleToggleOpenCategories() {
    setOpenCategories(!openCategories)
  }

  async function handleLogout() {
    try {
      await authService.logout()
      window.location.href = "/"
    } catch (err) {
      errorService.handle(err)
    }
  }

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <List className={classes.list}>
        <ListItem component={Link} to="/" button onClick={onClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>

          <ListItemText primary="Home" />
        </ListItem>

        <ListItem component={Link} to="/categories" button onClick={onClose}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>

          <ListItemText primary="Categories" />

          <ListItemSecondaryAction>
            <IconButton onClick={handleToggleOpenCategories}>
              {openCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                button
                className={classes.nested}
                component={Link}
                to={`/categories/${category.id}`}
                onClick={onClose}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem
          component={Link}
          to="/dev/typography"
          button
          onClick={onClose}
        >
          <ListItemIcon>
            <TypographyIcon />
          </ListItemIcon>

          <ListItemText primary="Typography" />
        </ListItem>

        <ListItem component={Link} to="/dev/palette" button onClick={onClose}>
          <ListItemIcon>
            <PaletteIcon />
          </ListItemIcon>

          <ListItemText primary="Palette" />
        </ListItem>

        <ListItem button component={Link} to="/login" onClick={onClose}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>

          <ListItemText primary="Login" />
        </ListItem>

        <ListItem button component={Link} to="/signup" onClick={onClose}>
          <ListItemIcon>
            <SignUpIcon />
          </ListItemIcon>

          <ListItemText primary="Sign Up" />
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
