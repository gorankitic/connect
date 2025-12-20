// lib
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
// services
import { getOrCreateConversationApi } from "@/services/conversation.services";

export const useGetOrCreateConversation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: getOrCreate, isPending, data } = useMutation({
        mutationFn: getOrCreateConversationApi,
        onSuccess: ({ conversation }, { serverId }) => {
            queryClient.setQueryData(["conversation", serverId, conversation.conversationId], conversation);
            navigate(`/servers/${serverId}/conversations/${conversation.conversationId}`);
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { getOrCreate, isPending, conversation: data?.conversation }
}