// lib
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// types
import type { ChatType } from "@/lib/types/chat.types";
import type { NormalizedError } from "@/lib/api/apiTypes";
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// services
import { updateChannelMessageApi, updateConversationMessageApi } from "@/services/message.services";

type UpdateMessageProps = {
    type: ChatType | undefined;
    serverId: string | undefined;
    targetId: string | undefined;
    messageId: string;
}

export const useUpdateMessage = ({ type, serverId, targetId, messageId }: UpdateMessageProps) => {
    const isReady = !!type && !!serverId && !!targetId;

    const { mutate: updateMessage, isPending } = useMutation({
        mutationFn: ({ content }: UpsertMessageSchema) => {
            if (!isReady) {
                // this should never be called, but keeps TS happy
                throw new Error("Chat context not ready");
            }
            if (type === CHAT_TYPE.CHANNEL) {
                return updateChannelMessageApi({
                    serverId,
                    targetId,
                    messageId,
                    body: { content },
                });
            }
            return updateConversationMessageApi({
                serverId,
                targetId,
                messageId,
                body: { content },
            });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateMessage, isPending };
}