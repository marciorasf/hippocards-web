import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { Container, Grid } from "@material-ui/core"

import useDidMount from "../../hooks/useDidMount"
import { CategoryWithFlashcards } from "../../interfaces/category"
import apiService from "../../services/api"
import errorService from "../../services/error"

async function getCategory(categoryId: number) {
  try {
    const { data } = await apiService.get(`/categories/${categoryId}`)
    return data.category as CategoryWithFlashcards
  } catch (err) {
    errorService.handle(err)
    return null
  }
}

const Categories: React.FC = () => {
  const [category, setCategory] = useState<CategoryWithFlashcards | null>()

  const { id: categoryId } = useParams<{ id: string }>()

  async function getAndUpdateCategory() {
    const categoryData = await getCategory(+categoryId)
    setCategory(categoryData)
  }

  useDidMount(() => {
    getAndUpdateCategory()
  })

  return (
    <Container>
      <Grid container direction="column">
        {category?.flashcards?.map((flashcard) => {
          return (
            <Grid key={flashcard.id} item>
              {flashcard.id}
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Categories
