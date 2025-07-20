import type { StudySet } from "./StudySet"

export type User = {
    id: number
    username: string
    studySets: StudySet[]
    password: string
}