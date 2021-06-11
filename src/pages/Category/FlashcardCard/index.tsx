import React, { SyntheticEvent, useEffect, useState } from "react"

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
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons"
import useStyles from "@pages/Category/FlashcardCard/styles"
import useCommonStyles from "@styles/commonStyles"

type FlashcardCardProps = {
  flashcard: Flashcard
  handleClickEdit?: (flashcard: Flashcard) => void
  handleClickDelete?: (flashcard: Flashcard) => Promise<void>
  handleClickToggleIsFlashcardKnown: (flashcard: Flashcard) => Promise<void>
  handleClickToggleIsFlashcardBookmarked: (
    flashcard: Flashcard
  ) => Promise<void>
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({
  flashcard,
  handleClickEdit,
  handleClickDelete,
  handleClickToggleIsFlashcardKnown,
  handleClickToggleIsFlashcardBookmarked,
}) => {
  const [menuAnchor, setMenuAnchor] =
    useState<(EventTarget & Element) | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const commonClasses = useCommonStyles()
  const classes = useStyles()

  function handleOpenMenu(event: SyntheticEvent) {
    setMenuAnchor(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchor(null)
  }

  function toggleShowAnswer() {
    setShowAnswer(!showAnswer)
  }

  useEffect(() => {
    setShowAnswer(false)
  }, [flashcard])

  return (
    <Card className={commonClasses.fullHeight}>
      <Grid container direction="column" className={commonClasses.fullHeight}>
        <Grid item>
          <CardHeader
            title={`Card ${flashcard.id}`}
            action={
              handleClickEdit &&
              handleClickDelete && (
                <IconButton aria-label="settings" onClick={handleOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
              )
            }
          />
        </Grid>

        <Grid item xs>
          <CardActionArea
            onClick={toggleShowAnswer}
            className={commonClasses.fullHeight}
          >
            <CardContent className={commonClasses.fullHeight}>
              <Grid container direction="column" spacing={4}>
                <Grid item>
                  <Typography variant="body1" className={classes.titleFont}>
                    Question
                  </Typography>

                  <Spacing orientation="horizontal" size={1.25} />

                  <Typography variant="body2" className={classes.paragraph}>
                    {flashcard.question}
                  </Typography>
                </Grid>

                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography variant="body1" className={classes.titleFont}>
                        Answer
                      </Typography>
                    </Grid>

                    <Grid item>
                      {showAnswer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Grid>
                  </Grid>

                  <Collapse in={showAnswer}>
                    <Spacing orientation="horizontal" size={1.25} />

                    <Typography variant="body2" className={classes.paragraph}>
                      {flashcard.answer}
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
                    onClick={() =>
                      handleClickToggleIsFlashcardBookmarked(flashcard)
                    }
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
                    flashcard.isKnown ? "Set as unlearned" : "Set as learned"
                  }
                >
                  <IconButton
                    color={flashcard.isKnown ? "primary" : "default"}
                    onClick={() => handleClickToggleIsFlashcardKnown(flashcard)}
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
        {handleClickEdit && (
          <MenuItem onClick={() => handleClickEdit(flashcard)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>

            <ListItemText primary="Edit" />
          </MenuItem>
        )}

        {handleClickDelete && (
          <MenuItem onClick={() => handleClickDelete(flashcard)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>

            <ListItemText primary="Delete" />
          </MenuItem>
        )}
      </Menu>
    </Card>
  )
}

export default FlashcardCard
