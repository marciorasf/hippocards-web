import React, { useState, SyntheticEvent } from "react"

import { Category, CategoryWithFlashcardsInfo } from "@interfaces/category"
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
  CircularProgress,
  Box,
  Typography,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons"
import useStyles from "@pages/Categories/CategoryCard/styles"
import useCommonStyles from "@styles/commonStyles"

type CategoryCardProps = {
  category: CategoryWithFlashcardsInfo
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

  function handleOpenMenu(event: SyntheticEvent) {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchor(null)
  }

  function getProgressValue() {
    if (category.flashcardsInfo.flashcardsCount === 0) {
      return 0
    }

    const knownFlashcardsRatio =
      category.flashcardsInfo.isKnownCount /
      category.flashcardsInfo.flashcardsCount

    const progressValue = Math.round(knownFlashcardsRatio * 100)

    return progressValue
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
                <IconButton aria-label="settings" onClick={handleOpenMenu}>
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
                  <Box display="flex" justifyContent="center" padding={1}>
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        variant="determinate"
                        value={getProgressValue()}
                        size={184}
                        thickness={2.4}
                      />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography variant="h6">
                          {`${category.flashcardsInfo.isKnownCount} / ${category.flashcardsInfo.flashcardsCount}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
