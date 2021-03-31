import { Formik, Form } from "formik"
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core"
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  Add as AddIcon,
} from "@material-ui/icons"

import InputField from "../../components/InputField"
import useDidMount from "../../hooks/useDidMount"
import { Category } from "../../interfaces/category"
import apiService from "../../services/api"
import errorService from "../../services/error"

type CreateCategoryData = {
  name: string
}

async function getCategories() {
  try {
    const { data } = await apiService.get("/categories")
    return data.categories as Category[]
  } catch (err) {
    errorService.handle(err)
    return []
  }
}

const CategoriesDashboard: React.FC = () => {
  const [userCategories, setUserCategories] = useState<Category[]>([])
  const [openDialog, setOpenDialog] = useState(false)

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

  function handleEditCategory() {}

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

  useDidMount(() => {
    getAndUpdateCategories()
  })

  function handleOpenDialog() {
    setOpenDialog(true)
  }

  function handleCloseDialog() {
    setOpenDialog(false)
  }

  return (
    <Container>
      <Typography variant="h2">Categories</Typography>

      <Grid container>
        <Grid item>
          <Card>
            <CardActionArea onClick={handleOpenDialog}>
              <CardContent>
                <AddIcon />
              </CardContent>
            </CardActionArea>
          </Card>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async (values) => {
                await handleCreateCategory(values)
                handleCloseDialog()
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <DialogTitle id="form-dialog-title">Add category</DialogTitle>
                  <DialogContent>
                    <InputField name="name" label="Name" required />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      disabled={isSubmitting}
                      onClick={handleCloseDialog}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Dialog>
        </Grid>

        {userCategories.map((category) => {
          return (
            <Grid key={category.id} item>
              <Card>
                <CardActionArea
                  onClick={() => {
                    goToCategoryPage(category.id)
                  }}
                >
                  <CardHeader title={category.name} />

                  <CardContent>{category.name}</CardContent>
                </CardActionArea>

                <CardActions>
                  <IconButton onClick={handleEditCategory}>
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
    </Container>
  )
}

export default CategoriesDashboard
