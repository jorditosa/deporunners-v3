import { useQuery } from "@tanstack/react-query"
import { authActions } from "../actions/authActions"
import { Preferences } from "@capacitor/preferences";

export const useAuth = () => {
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { value } = await Preferences.get({key: 'depotoken'});
            if (!value) {
                throw new Error('No authentication token found');
            }
            return authActions.getUser(value);
        },
        retry: 1,
        refetchOnWindowFocus: false
    });

    return {
        data,
        isError,
        isLoading,
        refetch,
    };
};