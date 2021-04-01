export type Flashcard = {
  id: number
  question: string
  answer: string
  isBookmarked: boolean
  isKnown: boolean
}

export type CreateFlashcardData = {
  question: string
  answer: string
}

export type UpdateFlashcardData = CreateFlashcardData
