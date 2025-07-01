import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { sendRequest } from "../utils/request"
import type { StudySet } from "../types/StudySet";

export const useFetchAllStudySets = (): UseQueryResult<StudySet[] | undefined, Error> => {
    return useQuery<StudySet[], Error>({
        queryKey: ["study-sets"],
        queryFn: async() => {
            return await sendRequest({
                url: "api/v1/StudySet/study-sets",
                method: "GET"
            });
        },
    })
};