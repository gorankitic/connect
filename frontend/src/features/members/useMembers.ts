// lib
import { useQuery } from "@tanstack/react-query"
// services
import { getMembersApi } from "@/services/member.services";

export const useMembers = (serverId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: ["members", serverId],
        queryFn: () => getMembersApi({ serverId: serverId! }),
        enabled: !!serverId,
    });

    return { members: data ?? [], isPending }
}