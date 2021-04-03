import React, { SyntheticEvent, useState } from "react"

import { Flashcard } from "@interfaces/flashcard"
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
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
import useStyles from "@pages/Category/FlashcardCard/styles"
import useCommonStyles from "@styles/commonStyles"

type FlashcardCardProps = {
  flashcard: Flashcard
  handleClickCard: (flashcard: Flashcard) => void
  handleClickEdit: (flashcard: Flashcard) => void
  handleClickDelete: (flashcard: Flashcard) => Promise<void>
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({
  flashcard,
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
        onClick={() => handleClickCard(flashcard)}
      >
        <Grid container direction="column" className={commonClasses.fullHeight}>
          <Grid item>
            <CardHeader
              title={`Card ${flashcard.id}`}
              action={
                <IconButton aria-label="settings" onClick={handleClickSettings}>
                  <MoreVertIcon />
                </IconButton>
              }
            />
          </Grid>

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
                <Grid item>Question: {flashcard.question}</Grid>

                <Grid item>Answer: {flashcard.answer}</Grid>

                <Grid item>
                  isKnown: {flashcard.isKnown ? "true" : "false"}
                </Grid>

                <Grid item>
                  isBookmarked: {flashcard.isBookmarked ? "true" : "false"}
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>

      {/* The menu must be outside CardActionArea to not trigger it's onClick */}
      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleClickEdit(flashcard)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>

          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem onClick={() => handleClickDelete(flashcard)}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>

          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default FlashcardCard
