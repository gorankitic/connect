// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { createChannelMessageApi } from "@/services/message.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useCreateChannelMessage = () => {
    const queryClient = useQueryClient();

    const { mutate: createChannelMessage, isPending } = useMutation({
        mutationFn: createChannelMessageApi,
        onSuccess: ({ message }, { serverId, channelId }) => {
            queryClient.setQueryData(
                ["channel-messages", serverId, channelId],
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

    return { createChannelMessage, isPending };
}