import React, { useEffect, useState } from "react"

import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import { Button, Container, Grid, Modal } from "@material-ui/core"
import FlashcardCard from "@pages/Category/FlashcardCard"
import useStyles from "@pages/Category/StudyMode/styles"

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
  const [flashcardsInRandomOrder, setFlashcardsInRandomOrder] = useState<
    Flashcard[]
  >([])
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const classes = useStyles()

  function handleNextFlashcard() {
    const flashcardsCount = flashcardsInRandomOrder.length
    const newIndex = (currentFlashcardIndex + 1) % flashcardsCount
    setCurrentFlashcardIndex(newIndex)
  }

  useEffect(() => {
    const unknownFlashcards = category.flashcards.filter(
      (flashcard) => !flashcard.isKnown
    )

    setFlashcardsInRandomOrder(unknownFlashcards)
  }, [category])

  return (
    <Modal open={active} onClose={onClose} className={classes.modal}>
      <Container maxWidth="xs" disableGutters>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          spacing={2}
          style={{ width: "100%" }}
        >
          <Grid item>
            <FlashcardCard
              flashcard={category.flashcards[currentFlashcardIndex]}
              handleClickToggleIsFlashcardBookmarked={
                handleClickToggleIsFlashcardBookmarked
              }
              handleClickToggleIsFlashcardKnown={
                handleClickToggleIsFlashcardKnown
              }
            />
          </Grid>

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
