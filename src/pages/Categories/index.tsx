import React, { useState } from "react"

import { Container } from "@material-ui/core"

import useDidMount from "../../hooks/useDidMount"
import apiService from "../../services/api"
import errorService from "../../services/error"

type Category = {
  id: number
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

const Categories: React.FC = () => {
  const [userCategories, setUserCategories] = useState<Category[]>([])

  async function getAndUpdateCategories() {
    const categories = await getCategories()
    setUserCategories(categories)
  }

  useDidMount(() => {
    getAndUpdateCategories()
  })

  return <Container>Categories</Container>
}

export default Categories
