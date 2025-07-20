import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../types/User";
import { useAuth } from "../contexts/AuthContext";

export const useFetchCurrentUser = (): UseQueryResult<User | undefined, Error> => {
    const { user } = useAuth();
    
    return useQuery<User | undefined, Error>({
        queryKey: ["currentUser", user?.username],
        queryFn: async() => {
            // If no user is logged in, return undefined
            if (!user) {
                return undefined;
            }
            
            // Convert the auth user to the User type expected by the app
            return {
                id: 0, // You may need to get this from login response
                username: user.username,
                password: "", // Don't store passwords
                studySets: [] // This can be fetched separately
            };
        },
        enabled: !!user, // Only run query if user exists
    });
};