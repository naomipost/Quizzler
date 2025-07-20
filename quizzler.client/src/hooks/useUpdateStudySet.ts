import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";
import type { StudySetDto } from "./useCreateStudySet";

export type UpdateStudySetDto = Omit<StudySetDto, "createdAt">;

export default function useUpdateStudySet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (studySetDto: UpdateStudySetDto) => {
            return await sendRequest<UpdateStudySetDto, UpdateStudySetDto>({
                url: "api/v1/studySet/update-study-set/" + studySetDto.id,
                method: "PUT",
                body: studySetDto
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["study-sets"]
            });
        }
    });
}