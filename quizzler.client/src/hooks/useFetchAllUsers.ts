import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../types/User";
import { sendRequest } from "../utils/request";

export const useFetchAllUsers = (): UseQueryResult<User[] | undefined, Error> => {
    return useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: async() => {
            return await sendRequest({
                url: "api/v1/User/all-users",
                method: "GET"
            });
        },
    })
};