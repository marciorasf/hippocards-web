import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import {
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Card,
  CardActions,
  IconButton,
  CardActionArea,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  Add as AddIcon,
} from "@material-ui/icons"

import useDidMount from "../../hooks/useDidMount"
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "../../interfaces/category"
import apiService from "../../services/api"
import errorService from "../../services/error"
import CategoryDialog from "./CategoryDialog"

async function getCategories() {
  try {
    const { data } = await apiService.get("/categories")
    return data.categories as Category[]
  } catch (err) {
    errorService.handle(err)
    return []
  }
}

type Dialog = "create" | "edit"

const CategoriesDashboard: React.FC = () => {
  const [userCategories, setUserCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState<Dialog | null>(null)
  const [
    currentCategoryOnEdition,
    setCurrentCategoryOnEdition,
  ] = useState<Category>()

  const history = useHistory()

  async function getAndUpdateCategories() {
    const categories = await getCategories()
    setUserCategories(categories)
  }

  async function handleCreateCategory(categoryData: CreateCategoryData) {
    try {
      await apiService.post("/categories", categoryData)
      getAndUpdateCategories()
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleEditCategory(categoryData: UpdateCategoryData) {
    const categoryId = currentCategoryOnEdition?.id
    try {
      await apiService.put(`/categories/${categoryId}`, categoryData)
      getAndUpdateCategories()
    } catch (err) {
      errorService.handle(err)
    }
  }

  async function handleDeleteCategory(categoryId: number) {
    try {
      await apiService.delete(`/categories/${categoryId}`)
      getAndUpdateCategories()
    } catch (err) {
      errorService.handle(err)
    }
  }

  function goToCategoryPage(categoryId: number) {
    history.push(`/categories/${categoryId}`)
  }

  function handleOpenDialog(dialog: Dialog) {
    setOpenDialog(dialog)
  }

  function handleCloseDialog() {
    setOpenDialog(null)
  }

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return (
    <Container>
      <Typography variant="h2">Categories</Typography>

      <Grid container>
        <Grid item>
          <Card>
            <CardActionArea onClick={() => handleOpenDialog("create")}>
              <CardContent>
                <AddIcon />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {userCategories.map((category) => {
          return (
            <Grid key={category.id} item>
              <Card>
                <CardActionArea onClick={() => goToCategoryPage(category.id)}>
                  <CardHeader title={category.name} />

                  <CardContent>{category.name}</CardContent>
                </CardActionArea>

                <CardActions>
                  <IconButton
                    onClick={() => {
                      setCurrentCategoryOnEdition(category)
                      handleOpenDialog("edit")
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDeleteCategory(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <CategoryDialog
        title="Add category"
        open={openDialog === "create"}
        onClose={handleCloseDialog}
        onOk={handleCreateCategory}
        okButtonLabel="add"
      />

      <CategoryDialog
        title="Edit category"
        open={openDialog === "edit"}
        onClose={handleCloseDialog}
        onOk={handleEditCategory}
        okButtonLabel="save"
        initialValues={{ name: currentCategoryOnEdition?.name || "" }}
      />
    </Container>
  )
}

export default CategoriesDashboard
