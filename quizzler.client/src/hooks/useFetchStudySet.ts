import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { sendRequest } from "../utils/request"
import type { StudySet } from "../types/StudySet";

export const useFetchStudySet = (id: string): UseQueryResult<StudySet | undefined, Error> => {
    return useQuery<StudySet, Error>({
        queryKey: ["study-set", id],
        queryFn: async() => {
            return await sendRequest({
                url: `api/v1/StudySet/study-set${id}`,
                method: "GET"
            });
        },
        enabled: !!id, // Only run query if id is provided
    })
};
