import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { Header, PageContentContainer, Spacing } from "@components"
import useDidMount from "@hooks/useDidMount"
import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import FlashcardCard from "@pages/Category/FlashcardCard"
import FlashcardDialog from "@pages/Category/FlashcardDialog"
import categoryService from "@services/category"
import errorService from "@services/error"
import flashcardService, { CreateFlashcardInput } from "@services/flashcard"
import useCommonStyles from "@styles/commonStyles"

import useStyles from "./styles"

async function getCategory(categoryId: number) {
  try {
    return categoryService.retrieveOne(categoryId)
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

  const classes = useStyles()
  const commonClasses = useCommonStyles()

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
      await getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditFlashcard(flashcard: Flashcard) {
    setCurrentFlashcardOnEdition(flashcard)
    handleOpenDialog("edit")
  }

  async function handleEditFlashcard(flashcardData: CreateFlashcardInput) {
    const flashcardId = currentFlashcardOnEdition?.id

    if (flashcardId) {
      try {
        await flashcardService.update(+flashcardId, flashcardData)
        await getAndUpdateCategory()
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  async function handleDeleteFlashcard(flashcard: Flashcard) {
    try {
      await flashcardService.delete(flashcard.id)
      await getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleToggleIsFlashcardKnown(flashcard: Flashcard) {
    try {
      await flashcardService.update(flashcard.id, {
        isKnown: !flashcard.isKnown,
      })
      await getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  useDidMount(() => {
    getAndUpdateCategory()
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Typography variant="h4">{category?.name}</Typography>

          <Spacing orientation="horizontal" size={4} />

          <Grid container spacing={2} alignItems="stretch">
            <Grid item md={4} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardActionArea
                  className={commonClasses.fullHeight}
                  onClick={() => handleOpenDialog("create")}
                >
                  <CardContent>
                    <Grid container justify="center" alignItems="center">
                      <AddIcon fontSize="large" />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            {category?.flashcards?.map((flashcard) => (
              <Grid key={flashcard.id} item md={4} sm={6} xs={12}>
                <FlashcardCard
                  key={flashcard.id}
                  flashcard={flashcard}
                  handleClickEdit={handleClickEditFlashcard}
                  handleClickDelete={handleDeleteFlashcard}
                  handleClickMarkAsKnown={handleToggleIsFlashcardKnown}
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
        </PageContentContainer>
      </Grid>
    </Grid>
  )
}

export default Categories
