import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";

type Login = {
    username: string
    password: string
}

export default function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(loginData: Login) => {
            return await sendRequest<Login, Login>({
                url: "api/v1/user/login",
                method: "GET",
                body: loginData
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
}