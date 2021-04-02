import React, { useState } from "react"
import { useParams } from "react-router-dom"

import Header from "@components/Header"
import useDidMount from "@hooks/useDidMount"
import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import { Grid, Card, CardActionArea, CardContent } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import FlashcardDialog from "@pages/Category/FlashcardDialog"
import apiService from "@services/api"
import errorService from "@services/error"
import flashcardService, {
  CreateFlashcardInput,
  UpdateFlashcardInput,
} from "@services/flashcard"

import FlashcardCard from "./FlashcardCard"

async function getCategory(categoryId: number) {
  try {
    const { data } = await apiService.get(`/categories/${categoryId}`)
    return data.category as CategoryWithFlashcards
  } catch (err) {
    errorService.handle(err)
    return null
  }
}

type Dialog = "create" | "edit"

const Categories: React.FC = () => {
  const [category, setCategory] = useState<CategoryWithFlashcards | null>()
  const [openDialog, setOpenDialog] = useState<Dialog | null>(null)
  const [
    currentFlashcardOnEdition,
    setCurrentFlashcardOnEdition,
  ] = useState<Flashcard>()

  const { id: categoryId } = useParams<{ id: string }>()

  async function getAndUpdateCategory() {
    const categoryData = await getCategory(+categoryId)
    setCategory(categoryData)
  }

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  async function handleCreateFlashcard(flashcardData: CreateFlashcardInput) {
    try {
      await flashcardService.create(+categoryId, flashcardData)
      getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditFlashcard(flashcard: Flashcard) {
    setCurrentFlashcardOnEdition(flashcard)
    handleOpenDialog("edit")
  }

  async function handleEditFlashcard(flashcardData: UpdateFlashcardInput) {
    const flashcardId = currentFlashcardOnEdition?.id

    if (flashcardId) {
      try {
        await flashcardService.update(+flashcardId, flashcardData)
        getAndUpdateCategory()
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  async function handleDeleteFlashcard(flashcard: Flashcard) {
    try {
      await flashcardService.delete(flashcard.id)
      getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickFlashcardCard(_flashcard: Flashcard) {}

  useDidMount(() => {
    getAndUpdateCategory()
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="column">
          <Grid item>
            <Card>
              <CardActionArea onClick={() => handleOpenDialog("create")}>
                <CardContent>
                  <AddIcon />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {category?.flashcards?.map((flashcard) => (
            <Grid key={flashcard.id} item>
              <FlashcardCard
                key={flashcard.id}
                flashcard={flashcard}
                handleClickCard={handleClickFlashcardCard}
                handleClickEdit={handleClickEditFlashcard}
                handleClickDelete={handleDeleteFlashcard}
              />
            </Grid>
          ))}
        </Grid>

        <FlashcardDialog
          title="Add flashcard"
          open={openDialog === "create"}
          onClose={handleCloseDialog}
          onOk={handleCreateFlashcard}
          okButtonLabel="add"
        />

        <FlashcardDialog
          title="Edit flashcard"
          open={openDialog === "edit"}
          onClose={handleCloseDialog}
          onOk={handleEditFlashcard}
          okButtonLabel="save"
          initialValues={{
            question: currentFlashcardOnEdition?.question || "",
            answer: currentFlashcardOnEdition?.answer || "",
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Categories
