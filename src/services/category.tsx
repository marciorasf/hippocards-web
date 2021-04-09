import {
  Category,
  CategoryWithFlashcardsInfo,
  CategoryWithFlashcards,
} from "@interfaces/category"
import apiService from "@services/api"

export type CreateCategoryInput = {
  name: string
}

type CreateCategoryResponse = {
  category: Category
}

type RetrieveAllCategoriesResponse = {
  categories: CategoryWithFlashcardsInfo[]
}

type RetrieveOneCategoryResponse = {
  category: CategoryWithFlashcards
}

export type UpdateCategoryInput = CreateCategoryInput

type UpdateCategoryResponse = CreateCategoryResponse

const categoryService = {
  async create(inputData: CreateCategoryInput) {
    const response = await apiService.post("/categories", inputData)
    const data = response.data as CreateCategoryResponse
    const categoryWithFlashcardInfo: CategoryWithFlashcardsInfo = {
      ...data.category,
      flashcardsInfo: {
        flashcardsCount: 0,
        isKnownCount: 0,
        isBookmarkedCount: 0,
      },
    }
    return categoryWithFlashcardInfo
  },

  async retrieveAll() {
    const response = await apiService.get("/categories")
    const data = response.data as RetrieveAllCategoriesResponse
    return data.categories
  },

  async retrieveOne(categoryId: number) {
    const response = await apiService.get(`/categories/${categoryId}`)
    const data = response.data as RetrieveOneCategoryResponse
    return data.category
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
    await apiService.delete(`/categories/${categoryId}`)
  },
}

export default categoryService
