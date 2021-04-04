import React, { SyntheticEvent, useState } from "react"

import Spacing from "@components/Spacing"
import { Flashcard } from "@interfaces/flashcard"
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CardActions,
  Typography,
  Tooltip,
  CardActionArea,
  Collapse,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutlined as UnknownIcon,
  CheckCircle as KnownIcon,
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
            onClick={toggleShowAnswer}
            className={commonClasses.fullHeight}
          >
            <CardContent className={commonClasses.fullHeight}>
              <Grid container direction="column">
                <Grid item>
                  <Typography>
                    <b>Question:</b> {flashcard.question}
                  </Typography>
                </Grid>

                <Grid item>
                  <Collapse in={showAnswer}>
                    <Spacing orientation="horizontal" size={4} />
                    <Typography>
                      <b>Answer:</b> {flashcard.answer}
                    </Typography>
                  </Collapse>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Grid>

        <Grid item>
          <CardActions>
            <Grid container justify="flex-end">
              <Grid item>
                <Tooltip
                  title={flashcard.isBookmarked ? "Unbookmark" : "Bookmark"}
                >
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
                </Tooltip>
              </Grid>

              <Grid item>
                <Tooltip
                  title={
                    flashcard.isKnown ? "Mark as unknown" : "Mark as known"
                  }
                >
                  <IconButton
                    color={flashcard.isKnown ? "primary" : "default"}
                    onClick={() => handleClickMarkAsKnown(flashcard)}
                  >
                    {flashcard.isKnown ? <KnownIcon /> : <UnknownIcon />}
                  </IconButton>
                </Tooltip>
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
        onClick={handleCloseMenu}
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
