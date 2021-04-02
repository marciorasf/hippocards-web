import { Flashcard } from "@interfaces/flashcard"

export type Category = {
  id: number
  name: string
}

export type CategoryWithFlashcards = Category & {
  flashcards: Flashcard[]
}
