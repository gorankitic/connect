// lib
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// types
import type { Message } from "@/lib/types/message.types";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
import { CHANNEL_EVENTS } from "@/lib/constants/channel.constants";
import { CONVERSATION_EVENTS } from "@/lib/constants/conversation.constants";
// hooks
import { useSocket } from "@/hooks/useSocket";

export const useSyncDataSocket = (serverId: string | undefined) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !serverId) return;

        const updateCache = (message: Message, updater: (msg: Message) => any) => {
            const type = message.conversationId ? CHAT_TYPE.CONVERSATION : CHAT_TYPE.CHANNEL;
            const targetId = message.conversationId || message.channelId;
            const queryKey = [`${type}-messages`, serverId, targetId];

            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        messages: page.messages
                            .map((msg: Message) => updater(msg))
                            .filter(Boolean)
                    }))
                }
            });
        }

        const handleNewMessage = (message: Message) => {
            const type = message.conversationId ? CHAT_TYPE.CONVERSATION : CHAT_TYPE.CHANNEL;
            const targetId = message.conversationId || message.channelId;
            const queryKey = [`${type}-messages`, serverId, targetId];

            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) =>
                        index === 0 ? { ...page, messages: [message, ...page.messages] } : page
                    )
                }
            });
        }

        const handleUpdateMessage = (msg: Message) => updateCache(msg, (m) => m._id === msg._id ? msg : m);
        const handleDeleteMessage = (msg: Message) => updateCache(msg, (m) => m._id === msg._id ? null : m);

        // Register conversation listeners
        socket.on(CONVERSATION_EVENTS.MESSAGE_CREATE, handleNewMessage);
        socket.on(CONVERSATION_EVENTS.MESSAGE_UPDATE, handleUpdateMessage);
        socket.on(CONVERSATION_EVENTS.MESSAGE_DELETE, handleDeleteMessage);
        // Register channel listeners
        socket.on(CHANNEL_EVENTS.MESSAGE_CREATE, handleNewMessage);
        socket.on(CHANNEL_EVENTS.MESSAGE_UPDATE, handleUpdateMessage);
        socket.on(CHANNEL_EVENTS.MESSAGE_DELETE, handleDeleteMessage);

        return () => {
            socket.off(CONVERSATION_EVENTS.MESSAGE_CREATE);
            socket.off(CONVERSATION_EVENTS.MESSAGE_UPDATE);
            socket.off(CONVERSATION_EVENTS.MESSAGE_DELETE);
            socket.off(CHANNEL_EVENTS.MESSAGE_CREATE);
            socket.off(CHANNEL_EVENTS.MESSAGE_UPDATE);
            socket.off(CHANNEL_EVENTS.MESSAGE_DELETE);
        };
    }, [socket, serverId, queryClient]);
};