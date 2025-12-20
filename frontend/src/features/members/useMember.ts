// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getMemberApi } from "@/services/member.services";

export const useMember = (serverId: string | undefined) => {
    const { isPending, data } = useQuery({
        queryKey: ["member", serverId],
        queryFn: () => getMemberApi({ serverId: serverId! }),
        enabled: !!serverId,
        staleTime: Infinity,
        retry: false,
    });

    return { isPending, currentMember: data ?? null };
}