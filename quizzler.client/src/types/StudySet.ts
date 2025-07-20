import type { Flashcard } from "./Flashcard"

//TODO: fix ef core issue to add owner instead of userId
export type StudySet = {
    id: number
    name: string
    userId: number
    createdAt: string
    flashcards: Flashcard[]
}