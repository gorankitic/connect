// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getServersApi } from "@/services/server.services";

export const useServers = () => {
    const { isPending, data } = useQuery({
        queryKey: ["servers"],
        queryFn: getServersApi,
        staleTime: Infinity,
        retry: false,
    });

    return { isPending, servers: data?.servers ?? [] };
}