import { Flashcard } from "@interfaces/flashcard"
import apiService from "@services/api"

export type CreateFlashcardInput = {
  question: string
  answer: string
}

export type CreateFlashcardResponse = {
  flashcard: Flashcard
}

export type UpdateFlashcardInput = CreateFlashcardInput

export type UpdateFlashcardResponse = CreateFlashcardResponse

const flashcardService = {
  async create(categoryId: number, inputData: CreateFlashcardInput) {
    const response = await apiService.post("/flashcards", {
      ...inputData,
      categoryId,
    })
    const data = response.data as CreateFlashcardResponse
    return data.flashcard
  },

  async update(flashcardId: number, inputData: UpdateFlashcardInput) {
    const response = await apiService.put(
      `/flashcards/${flashcardId}`,
      inputData
    )
    const data = response.data as UpdateFlashcardResponse
    return data.flashcard
  },

  async delete(flashcardId: number) {
    apiService.delete(`/flashcards/${flashcardId}`)
  },
}

export default flashcardService
