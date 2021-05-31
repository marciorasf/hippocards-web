import React, { useState } from "react"

import { Spacing } from "@components"
import useDidMount from "@hooks/useDidMount"
import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core"
import FlashcardCard from "@pages/Category/FlashcardCard"
import useStyles from "@pages/Category/StudyMode/styles"
import useCommonStyles from "@styles/commonStyles"

type StudyModeProps = {
  category: CategoryWithFlashcards
  active: boolean
  onClose: () => void
  handleClickToggleIsFlashcardKnown: (flashcard: Flashcard) => Promise<void>
  handleClickToggleIsFlashcardBookmarked: (
    flashcard: Flashcard
  ) => Promise<void>
}

const StudyMode: React.FC<StudyModeProps> = ({
  category,
  active,
  onClose,
  handleClickToggleIsFlashcardBookmarked,
  handleClickToggleIsFlashcardKnown,
}) => {
  const [currentFlashcardId, setCurrentFlashcardId] = useState<number>()
  const classes = useStyles()
  const commonClasses = useCommonStyles()

  function handleNextFlashcard() {
    const unknownFlashcards = category.flashcards.filter(
      (flashcard) => !flashcard.isKnown && flashcard.id !== currentFlashcardId
    )

    if (unknownFlashcards.length === 0) {
      setCurrentFlashcardId(undefined)
      return
    }

    const flashcardsCount = unknownFlashcards.length
    const newIndex = Math.floor(Math.random() * flashcardsCount)
    setCurrentFlashcardId(unknownFlashcards[newIndex].id)
  }

  useDidMount(() => {
    handleNextFlashcard()
  })

  return (
    <Modal open={active} onClose={onClose} className={classes.modal}>
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          alignItems="stretch"
          style={{ width: "100%" }}
        >
          <Grid item>
            {currentFlashcardId ? (
              <FlashcardCard
                flashcard={
                  category.flashcards.find(
                    (flashcard) => flashcard.id === currentFlashcardId
                  ) as Flashcard
                }
                handleClickToggleIsFlashcardBookmarked={
                  handleClickToggleIsFlashcardBookmarked
                }
                handleClickToggleIsFlashcardKnown={
                  handleClickToggleIsFlashcardKnown
                }
              />
            ) : (
              <Card className={commonClasses.fullHeight}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  height="100%"
                >
                  <CardContent>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      There is no more unlearned flashcards.
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            )}
          </Grid>

          <Spacing orientation="horizontal" size={2} />

          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={onClose}
                >
                  Quit
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextFlashcard}
                  fullWidth
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  )
}

export default StudyMode
