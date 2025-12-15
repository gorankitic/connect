// lib
import { useQuery } from "@tanstack/react-query"
// services
import { getMembersApi } from "@/services/member.services";

export const useMembers = (enabled: boolean, serverId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: ["members", serverId],
        queryFn: () => getMembersApi(serverId!),
        enabled,
    });

    return { members: data?.members ?? [], isPending }
}