import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Flashcard } from "../types/Flashcard";
import { sendRequest } from "../utils/request";
import { useAuth } from "../contexts/AuthContext";

export type StudySetDto = {
    id?: number // Optional for creation
    name: string
    createdAt?: string // Optional for creation, server will set
    flashcards: Flashcard[]
    userId?: number // Add userId for backend
}

export default function useCreateStudySet() {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    
    return useMutation({
        mutationFn: async(studySetDto: StudySetDto) => {
            // Add the userId from the authenticated user
            const payload = {
                ...studySetDto,
                userId: user?.id || 1 // Use the authenticated user's ID, fallback to 1
            };
            
            return await sendRequest<typeof payload, StudySetDto>({
                url: "api/v1/studySet/create-study-set",
                method: "POST",
                body: payload
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-sets"]
            })
        }
    })
}