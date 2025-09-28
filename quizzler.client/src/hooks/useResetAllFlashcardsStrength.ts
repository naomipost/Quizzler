import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";


export default function useResetAllFlashcardsStrength() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (studySetId: number) => {
            return await sendRequest<number, void>({
                url: `api/v1/StudySet/reset-all-strength/${studySetId}`,
                method: "PUT",
                body: studySetId
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-sets"]
            });
        }
    });
}