// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getServerApi } from "@/services/server.services";
// types
import type { NormalizedError, Server } from "@/lib/api/apiTypes";

export function useServer(serverId?: string) {
    const { data, isPending, error } = useQuery<Server, NormalizedError>({
        queryKey: ["server", serverId],
        queryFn: () => getServerApi(serverId!),
        enabled: !!serverId,
        retry: false
    });

    return { server: data, isPending, error };
}