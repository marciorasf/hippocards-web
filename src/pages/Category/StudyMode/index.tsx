import React, { useEffect, useState } from "react"

import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import { Button, Container, Grid, Modal } from "@material-ui/core"
import useStyles from "@pages/Category/StudyMode/styles"

import FlashcardCard from "../FlashcardCard"

type StudyModeProps = {
  category: CategoryWithFlashcards
  active: boolean
  onClose: () => void
}

const StudyMode: React.FC<StudyModeProps> = ({ category, active, onClose }) => {
  console.log(category)
  const [flashcardsInRandomOrder, setFlashcardsInRandomOrder] = useState<
    Flashcard[]
  >([])
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const classes = useStyles()

  async function voidFunction() {}

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
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <FlashcardCard
              flashcard={category.flashcards[currentFlashcardIndex]}
              handleClickEdit={voidFunction}
              handleClickDelete={voidFunction}
              handleClickMarkAsBookmarked={voidFunction}
              handleClickMarkAsKnown={voidFunction}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextFlashcard}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  )
}

export default StudyMode
