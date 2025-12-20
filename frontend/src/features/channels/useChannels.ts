// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getChannelsApi } from "@/services/channel.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
import type { Channel } from "@/lib/types/channel.types";

export const useChannels = (serverId: string | undefined) => {
    const { isPending, data, error } = useQuery<Channel[], NormalizedError>({
        queryKey: ["channels", serverId],
        queryFn: () => getChannelsApi({ serverId: serverId! }),
        enabled: !!serverId,
        staleTime: 60 * 1000,
        retry: false
    });

    return { isPending, channels: data ?? [], error };
}