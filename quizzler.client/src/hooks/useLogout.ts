import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: async () => {
            // Clear user data from AuthContext and localStorage
            logout();
            
            // Clear all cached data
            queryClient.clear();
            
            // Navigate to home page
            navigate("/");
        },
        onSuccess: () => {
            // Invalidate all queries to ensure fresh data on next login
            queryClient.invalidateQueries();
        }
    });
}
