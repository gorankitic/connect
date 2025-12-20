// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getServerApi } from "@/services/server.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
import type { Server } from "@/lib/types/server.types";

export function useServer(serverId: string | undefined) {
    const { data, isPending, error } = useQuery<Server, NormalizedError>({
        queryKey: ["server", serverId],
        queryFn: () => getServerApi(serverId!),
        enabled: !!serverId,
        retry: false
    });

    return { server: data, isPending, error };
}