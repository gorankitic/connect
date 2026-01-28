// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// types
import type { ChatType } from "@/lib/types/chat.types";
import type { NormalizedError } from "@/lib/api/apiTypes";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// services
import { deleteChannelMessageApi, deleteConversationMessageApi } from "@/services/message.services";

type DeleteMessageProps = {
    type: ChatType | undefined;
    serverId: string | undefined;
    targetId: string | undefined;
    messageId: string | undefined;
}

export const useDeleteMessage = ({ type, serverId, targetId, messageId }: DeleteMessageProps) => {
    const isReady = !!type && !!serverId && !!targetId && !!messageId;

    const { mutate: deleteMessage, isPending } = useMutation({
        mutationFn: () => {
            if (!isReady) {
                // this should never be called, but keeps TS happy
                throw new Error("Chat context not ready");
            }
            if (type === CHAT_TYPE.CHANNEL) {
                return deleteChannelMessageApi({
                    serverId,
                    targetId,
                    messageId
                });
            }
            return deleteConversationMessageApi({
                serverId,
                targetId,
                messageId,
            });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { deleteMessage, isPending };
}