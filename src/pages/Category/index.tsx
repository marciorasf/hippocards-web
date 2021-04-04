import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { Header, PageContentContainer, Spacing } from "@components"
import { CategoryWithFlashcards } from "@interfaces/category"
import { Flashcard } from "@interfaces/flashcard"
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core"
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from "@material-ui/icons"
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

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  function insertFlashcardOnCategory(createdFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = [...category?.flashcards, createdFlashcard]

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleCreateFlashcard(flashcardData: CreateFlashcardInput) {
    try {
      const createdFlashcard = await flashcardService.create(
        +categoryId,
        flashcardData
      )
      insertFlashcardOnCategory(createdFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleClickEditFlashcard(flashcard: Flashcard) {
    setCurrentFlashcardOnEdition(flashcard)
    handleOpenDialog("edit")
  }

  function updateFlashcardOnCategory(updatedFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = category?.flashcards.map((flashcard) => {
      if (flashcard.id === updatedFlashcard.id) {
        return updatedFlashcard
      }

      return flashcard
    })

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleEditFlashcard(flashcardData: CreateFlashcardInput) {
    const flashcardId = currentFlashcardOnEdition?.id

    if (flashcardId) {
      try {
        const updatedFlashcard = await flashcardService.update(
          +flashcardId,
          flashcardData
        )
        updateFlashcardOnCategory(updatedFlashcard)
      } catch (err) {
        errorService.handle(err)
      }
    }
  }

  async function handleToggleIsFlashcardKnown(flashcard: Flashcard) {
    try {
      const updatedFlashcard = await flashcardService.update(flashcard.id, {
        isKnown: !flashcard.isKnown,
      })
      updateFlashcardOnCategory(updatedFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleToggleIsFlashcardBookmarked(flashcard: Flashcard) {
    try {
      const updatedFlashcard = await flashcardService.update(flashcard.id, {
        isBookmarked: !flashcard.isBookmarked,
      })
      updateFlashcardOnCategory(updatedFlashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  function deleteFlashcardOnCategory(deletedFlashcard: Flashcard) {
    if (!category) {
      return
    }

    const updatedFlashcards = category.flashcards.filter(
      (card) => card.id !== deletedFlashcard.id
    )

    setCategory({
      ...category,
      flashcards: updatedFlashcards,
    })
  }

  async function handleDeleteFlashcard(flashcard: Flashcard) {
    try {
      await flashcardService.delete(flashcard.id)
      deleteFlashcardOnCategory(flashcard)
    } catch (err) {
      errorService.handle(err)
    }
  }

  useEffect(() => {
    async function getAndUpdateCategory() {
      const categoryData = await getCategory(+categoryId)
      setCategory(categoryData)
    }

    getAndUpdateCategory()
  }, [categoryId])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12}>
        <PageContentContainer>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <IconButton component={Link} to="/categories">
                <ArrowBackIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Typography variant="h4">{category?.name}</Typography>
            </Grid>
          </Grid>

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
                  handleClickMarkAsBookmarked={
                    handleToggleIsFlashcardBookmarked
                  }
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
