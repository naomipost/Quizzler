import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";

export type UpdateFlashcardStrengthParams = {
    flashcardId: number;
    strength: number;
};

export default function useUpdateFlashcardStrength() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (params: UpdateFlashcardStrengthParams) => {
            return await sendRequest<number, void>({
                url: `api/v1/flashcard/update-strength/${params.flashcardId}`,
                method: "PUT",
                body: params.strength
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-sets"]
            });
        }
    });
}