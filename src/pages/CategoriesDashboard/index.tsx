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
} from "@material-ui/icons"

import useDidMount from "../../hooks/useDidMount"
import { Category } from "../../interfaces/category"
import apiService from "../../services/api"
import errorService from "../../services/error"

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
  const history = useHistory()

  async function getAndUpdateCategories() {
    const categories = await getCategories()
    setUserCategories(categories)
  }

  function handleCreateCategory() {}

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

  return (
    <Container>
      <Typography variant="h2">Categories</Typography>

      <Grid container>
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
