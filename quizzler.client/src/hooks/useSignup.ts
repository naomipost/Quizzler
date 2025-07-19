import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";

type Signup = {
    username: string
    password: string
    email: string
}

export default function useSignup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(signupData: Signup) => {
            return await sendRequest<Signup, Signup>({
                url: "api/v1/user/signup",
                method: "POST",
                body: signupData
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
}