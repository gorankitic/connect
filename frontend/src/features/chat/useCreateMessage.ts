// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
import type { ChatMessagesProps } from "@/lib/types/chat.types";
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// services
import { createChannelMessageApi, createConversationMessageApi } from "@/services/message.services";

export const useCreateMessage = ({ type, serverId, targetId }: ChatMessagesProps) => {
    if (!serverId || !targetId) {
        return {
            createMessage: () => { },
            isPending: false,
        }
    }
    const queryClient = useQueryClient();

    const { mutate: createMessage, isPending } = useMutation({
        mutationFn: ({ content }: UpsertMessageSchema) => {
            if (type === "channel") {
                return createChannelMessageApi({
                    serverId,
                    channelId: targetId,
                    body: { content },
                });
            }
            return createConversationMessageApi({
                serverId,
                conversationId: targetId,
                body: { content },
            });
        },
        onSuccess: ({ message }) => {
            queryClient.setQueryData(
                [`${type}-messages`, serverId, targetId],
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

    return { createMessage, isPending };
}