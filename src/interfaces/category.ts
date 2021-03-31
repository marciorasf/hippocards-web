import { Flashcard } from "./flashcard"

export type Category = {
  id: number
  name: string
}

export type CategoryWithFlashcards = Category & {
  flashcards: Flashcard[]
}

export type CreateCategoryData = {
  name: string
}

export type UpdateCategoryData = CreateCategoryData
