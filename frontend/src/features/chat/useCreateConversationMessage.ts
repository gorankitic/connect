// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { createConversationMessageApi } from "@/services/message.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useCreateConversationMessage = () => {
    const queryClient = useQueryClient();

    const { mutate: createConversationMessage, isPending } = useMutation({
        mutationFn: createConversationMessageApi,
        onSuccess: ({ message }, { serverId, conversationId }) => {
            queryClient.setQueryData(
                ["conversation-messages", serverId, conversationId],
                // OldData -> currently cached value
                (oldData: any) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any, index: number) => {
                            // Only modify the first page (newest messages)
                            if (index !== 0) return page;
                            return {
                                ...page,
                                messages: [message, ...page.messages]
                            }
                        })
                    }
                }
            )
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { createConversationMessage, isPending };
}