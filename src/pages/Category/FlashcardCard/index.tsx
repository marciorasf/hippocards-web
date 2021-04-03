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
  CardActions,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVert as MoreVertIcon,
  Check as KnownIcon,
  Bookmark as BookmarkedIcon,
  BookmarkBorder as NotBookmarkedIcon,
} from "@material-ui/icons"
import useStyles from "@pages/Category/FlashcardCard/styles"
import useCommonStyles from "@styles/commonStyles"

type FlashcardCardProps = {
  flashcard: Flashcard
  handleClickEdit: (flashcard: Flashcard) => void
  handleClickDelete: (flashcard: Flashcard) => Promise<void>
  handleClickMarkAsKnown: (flashcard: Flashcard) => Promise<void>
  handleClickMarkAsBookmarked: (flashcard: Flashcard) => Promise<void>
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({
  flashcard,
  handleClickEdit,
  handleClickDelete,
  handleClickMarkAsKnown,
  handleClickMarkAsBookmarked,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<(EventTarget & Element) | null>(
    null
  )
  const [showAnswer, setShowAnswer] = useState(false)

  const commonClasses = useCommonStyles()
  const classes = useStyles()

  function handleClickSettings(event: SyntheticEvent) {
    setMenuAnchor(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchor(null)
  }

  function toggleShowAnswer() {
    setShowAnswer(!showAnswer)
  }

  function handleClickCard() {
    toggleShowAnswer()
  }

  return (
    <Card className={classes.card}>
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
          <CardActionArea
            onClick={handleClickCard}
            className={commonClasses.fullHeight}
          >
            <CardContent className={commonClasses.fullHeight}>
              <Grid
                container
                alignItems="center"
                justify="center"
                className={commonClasses.fullHeight}
              >
                {showAnswer ? (
                  <Grid item>Question: {flashcard.question}</Grid>
                ) : (
                  <Grid item>Answer: {flashcard.answer}</Grid>
                )}
              </Grid>
            </CardContent>
          </CardActionArea>
        </Grid>

        <Grid item>
          <CardActions>
            <Grid container justify="flex-end">
              <Grid item>
                <IconButton
                  color={flashcard.isBookmarked ? "primary" : "default"}
                  onClick={() => handleClickMarkAsBookmarked(flashcard)}
                >
                  {flashcard.isBookmarked ? (
                    <BookmarkedIcon />
                  ) : (
                    <NotBookmarkedIcon />
                  )}
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton
                  color={flashcard.isKnown ? "primary" : "default"}
                  onClick={() => handleClickMarkAsKnown(flashcard)}
                >
                  <KnownIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>

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
