// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getUserApi } from "@/services/user.services";

export const useAuth = () => {
    const { isPending, data } = useQuery({
        queryKey: ["auth"],
        queryFn: getUserApi,
        staleTime: Infinity,
        retry: false,
    });

    return { isPending, user: data?.user ?? null };
}