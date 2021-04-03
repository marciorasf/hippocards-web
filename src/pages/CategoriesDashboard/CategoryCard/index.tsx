import React, { useState, SyntheticEvent } from "react"

import { Category, CategoryWithFlashcardInfo } from "@interfaces/category"
import {
  CardContent,
  CardHeader,
  Card,
  IconButton,
  CardActionArea,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons"
import useStyles from "@pages/CategoriesDashboard/CategoryCard/styles"
import useCommonStyles from "@styles/commonStyles"

type CategoryCardProps = {
  category: CategoryWithFlashcardInfo
  handleClickCard: (category: Category) => void
  handleClickEdit: (category: Category) => void
  handleClickDelete: (category: Category) => Promise<void>
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  handleClickCard,
  handleClickEdit,
  handleClickDelete,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<(EventTarget & Element) | null>(
    null
  )
  const commonClasses = useCommonStyles()
  const classes = useStyles()

  function handleClickSettings(event: SyntheticEvent) {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchor(null)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={commonClasses.fullHeight}
        onClick={() => handleClickCard(category)}
      >
        <Grid container direction="column" className={commonClasses.fullHeight}>
          <Grid item>
            <CardHeader
              title={category.name}
              action={
                <IconButton aria-label="settings" onClick={handleClickSettings}>
                  <MoreVertIcon />
                </IconButton>
              }
            />
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction="column"
              className={commonClasses.fullHeight}
            >
              <Grid item xs>
                <CardContent className={commonClasses.fullHeight}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="center"
                    className={commonClasses.fullHeight}
                    spacing={2}
                  >
                    <Grid item>
                      flashcardsCount: {category.flashcardsInfo.flashcardsCount}
                    </Grid>

                    <Grid item>
                      isKnownCount: {category.flashcardsInfo.isKnownCount}
                    </Grid>

                    <Grid item>
                      isBookmarkedCount:{" "}
                      {category.flashcardsInfo.isBookmarkedCount}
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>

      {/* The menu must be outside CardActionArea to not trigger it's onClick */}
      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={() => handleClickEdit(category)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>

          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem onClick={() => handleClickDelete(category)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>

          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default CategoryCard
