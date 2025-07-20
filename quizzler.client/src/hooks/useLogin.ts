import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "../utils/request";
import { useAuth } from "../contexts/AuthContext";

type Login = {
    username: string
    password: string
}

export default function useLogin() {
    const queryClient = useQueryClient();
    const { login } = useAuth();
    
    return useMutation({
        mutationFn: async(loginData: Login) => {
            return await sendRequest<Login, any>({
                url: "api/v1/user/login",
                method: "POST", // Changed to POST for login
                body: loginData
            })
        },
        onSuccess: (data, variables) => {
            // Store user data in AuthContext after successful login
            login({
                id: data.id || data.userId || 1, // Use actual ID from backend response
                username: variables.username,
                email: data.email || variables.username // Use email if returned, otherwise username
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
}