import { Flashcard } from "@interfaces/flashcard"

export type Category = {
  id: number
  name: string
}

export type CategoryWithFlashcardsInfo = Category & {
  flashcardsInfo: {
    flashcardsCount: number
    isKnownCount: number
    isBookmarkedCount: number
  }
}

export type CategoryWithFlashcards = Category & {
  flashcards: Flashcard[]
}
