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
} from "@material-ui/icons"
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
  const [openCategories, setOpenCategories] = useState(true)
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

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return (
    <Drawer open={open} onClose={onClose}>
      <List className={classes.list}>
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>

          <ListItemText primary="Home" />
        </ListItem>

        <ListItem component={Link} to="/categories" button>
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
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem component={Link} to="/dev/typography" button>
          <ListItemIcon>
            <TypographyIcon />
          </ListItemIcon>

          <ListItemText primary="Typography" />
        </ListItem>

        <ListItem component={Link} to="/dev/palette" button>
          <ListItemIcon>
            <PaletteIcon />
          </ListItemIcon>

          <ListItemText primary="Palette" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
