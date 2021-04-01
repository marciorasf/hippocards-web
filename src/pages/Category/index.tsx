import React, { useState } from "react"
import { useParams } from "react-router-dom"

import useDidMount from "@hooks/useDidMount"
import { CategoryWithFlashcards } from "@interfaces/category"
import {
  CreateFlashcardData,
  Flashcard,
  UpdateFlashcardData,
} from "@interfaces/flashcard"
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  Add as AddIcon,
} from "@material-ui/icons"
import FlashcardDialog from "@pages/Category/FlashcardDialog"
import apiService from "@services/api"
import errorService from "@services/error"

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

  async function handleCreateFlashcard(flashcardData: CreateFlashcardData) {
    try {
      await apiService.post("/flashcards", {
        categoryId,
        ...flashcardData,
      })
      getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleEditFlashcard(flashcardData: UpdateFlashcardData) {
    const flashcardId = currentFlashcardOnEdition?.id
    try {
      await apiService.put(`/flashcards/${flashcardId}`, flashcardData)
      getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleDeleteFlashcard(flashcardId: number) {
    try {
      await apiService.delete(`/flashcards/${flashcardId}`)
      getAndUpdateCategory()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  useDidMount(() => {
    getAndUpdateCategory()
  })

  return (
    <Container>
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

        {category?.flashcards?.map((flashcard) => {
          return (
            <Grid key={flashcard.id} item>
              <Card>
                <CardActionArea>
                  <CardHeader title={flashcard.question} />

                  <CardContent>{flashcard.answer}</CardContent>
                </CardActionArea>

                <CardActions>
                  <IconButton
                    onClick={() => {
                      setCurrentFlashcardOnEdition(flashcard)
                      handleOpenDialog("edit")
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeleteFlashcard(flashcard.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
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
    </Container>
  )
}

export default Categories
