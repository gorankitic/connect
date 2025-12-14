// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getServerApi } from "@/services/server.services";
// types
import type { GetServerResponse, NormalizedError } from "@/lib/api/apiTypes";

export function useServer(serverId?: string) {
    const { data, isPending, error } = useQuery<GetServerResponse, NormalizedError>({
        queryKey: ["server", serverId],
        queryFn: () => getServerApi(serverId!),
        enabled: !!serverId,
        retry: false
    });

    return { server: data?.server, member: data?.member, isPending, error };
}