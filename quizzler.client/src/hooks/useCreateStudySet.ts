import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Flashcard } from "../types/Flashcard";
import type { User } from "../types/User";
import { sendRequest } from "../utils/request";

export type StudySetDto = {
    name: string
    owner: User
    flashcards: Flashcard[]
}

export default function useCreateStudySet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(studySetDto: StudySetDto) => {
            return await sendRequest<StudySetDto, StudySetDto>({
                url: "api/v1/studySet/create-study-set",
                method: "POST",
                body: studySetDto
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-sets"]
            })
        }
    })
}