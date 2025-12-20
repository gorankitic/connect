// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getConversationApi } from "@/services/conversation.services";

export const useConversation = (serverId: string | undefined, conversationId: string | undefined) => {
    const { isPending, data } = useQuery({
        queryKey: ["conversation", serverId, conversationId],
        queryFn: () => getConversationApi({ serverId: serverId!, conversationId: conversationId! }),
        enabled: !!serverId && !!conversationId,
        staleTime: Infinity,
        retry: false,
    });

    return { isPending, conversation: data }
}