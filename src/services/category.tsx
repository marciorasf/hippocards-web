import { Category } from "@interfaces/category"
import apiService from "@services/api"

export type CreateCategoryInput = {
  name: string
}

export type CreateCategoryResponse = {
  category: Category
}

type RetrieveAllCategoriesResponse = {
  categories: Category[]
}

export type UpdateCategoryInput = CreateCategoryInput

type UpdateCategoryResponse = CreateCategoryResponse

const categoryService = {
  async create(inputData: CreateCategoryInput) {
    const response = await apiService.post("/categories", inputData)
    const data = response.data as CreateCategoryResponse
    return data.category
  },

  async retrieveAll() {
    const response = await apiService.get("/categories")
    const data = response.data as RetrieveAllCategoriesResponse
    return data.categories
  },

  async update(categoryId: number, inputData: UpdateCategoryInput) {
    const response = await apiService.put(
      `/categories/${categoryId}`,
      inputData
    )
    const data = response.data as UpdateCategoryResponse
    return data.category
  },

  async delete(categoryId: number) {
    apiService.delete(`/categories/${categoryId}`)
  },
}

export default categoryService
