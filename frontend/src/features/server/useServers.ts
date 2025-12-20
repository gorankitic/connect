// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getServersApi } from "@/services/server.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
import type { ServerListItem } from "@/lib/types/server.types";

export const useServers = () => {
    const { isPending, data, error } = useQuery<ServerListItem[], NormalizedError>({
        queryKey: ["servers"],
        queryFn: getServersApi,
        staleTime: Infinity,
        retry: false,
    });

    return { isPending, servers: data ?? [], error };
}