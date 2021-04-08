import { Flashcard } from "@interfaces/flashcard"
import createApiService from "@services/api"

export type CreateFlashcardInput = {
  question: string
  answer: string
}

type CreateFlashcardResponse = {
  flashcard: Flashcard
}

type RetrieveAllFlashcardsResponse = {
  flashcards: Flashcard[]
}

type RetrieveOneFlashcardResponse = {
  flashcard: Flashcard
}

export type UpdateFlashcardInput = Partial<CreateFlashcardInput> & {
  isKnown?: boolean
  isBookmarked?: boolean
}

type UpdateFlashcardResponse = CreateFlashcardResponse

const flashcardService = {
  async create(categoryId: number, inputData: CreateFlashcardInput) {
    const apiService = createApiService()
    const response = await apiService.post("/flashcards", {
      ...inputData,
      categoryId,
    })
    const data = response.data as CreateFlashcardResponse
    return data.flashcard
  },

  async retrieveAll() {
    const apiService = createApiService()
    const response = await apiService.get("flashcards")
    const data = response.data as RetrieveAllFlashcardsResponse
    return data.flashcards
  },

  async retrieveOne(flashcardId: number) {
    const apiService = createApiService()
    const response = await apiService.get(`flashcards/${flashcardId}`)
    const data = response.data as RetrieveOneFlashcardResponse
    return data.flashcard
  },

  async update(flashcardId: number, inputData: UpdateFlashcardInput) {
    const apiService = createApiService()
    const response = await apiService.put(
      `/flashcards/${flashcardId}`,
      inputData
    )
    const data = response.data as UpdateFlashcardResponse
    return data.flashcard
  },

  async delete(flashcardId: number) {
    const apiService = createApiService()
    await apiService.delete(`/flashcards/${flashcardId}`)
  },
}

export default flashcardService
