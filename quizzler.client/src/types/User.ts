import type { StudySet } from "./StudySet"

export type User = {
    id: string
    username: string
    studySets: StudySet[]
    password: string
}