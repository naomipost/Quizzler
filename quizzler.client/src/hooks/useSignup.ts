import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";
import { useAuth } from "../contexts/AuthContext";

type Signup = {
    username: string
    password: string
    email: string
}

export default function useSignup() {
    const queryClient = useQueryClient();
    const { login } = useAuth();
    
    return useMutation({
        mutationFn: async(signupData: Signup) => {
            return await sendRequest<Signup, any>({
                url: "api/v1/user/sign-up",
                method: "POST",
                body: signupData
            })
        },
        onSuccess: (data, variables) => {
            // Store user data in AuthContext after successful signup
            login({
                id: data.id || data.userId || 1, // Use actual ID from backend response
                username: variables.username,
                email: variables.email
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
}