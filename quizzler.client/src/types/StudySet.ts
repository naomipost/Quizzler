import type { Flashcard } from "./Flashcard"
import type { User } from "./User"

export type StudySet = {
    id: number
    name: string
    owner: User
    flashcards: Flashcard[]
}