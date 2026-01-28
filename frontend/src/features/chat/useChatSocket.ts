// lib
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// types
import type { ChatStoreData } from "@/lib/types/chat.types";
import type { Message } from "@/lib/types/message.types";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
import { CHANNEL_EVENTS } from "@/lib/constants/channel.constants";
import { CONVERSATION_EVENTS } from "@/lib/constants/conversation.constants";
// hooks
import { useSocket } from "@/hooks/useSocket";
import type { MessagesPage } from "@/lib/api/apiTypes";

export const useChatSocket = ({ serverId, targetId, type }: ChatStoreData) => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!serverId || !targetId || !socket || !isConnected || !type) return;

        const joinEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.CHANNEL_JOIN : CONVERSATION_EVENTS.CONVERSATION_JOIN;
        const leaveEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.CHANNEL_LEAVE : CONVERSATION_EVENTS.CONVERSATION_LEAVE;
        const newEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.MESSAGE_CREATE : CONVERSATION_EVENTS.MESSAGE_CREATE;
        const updateEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.MESSAGE_UPDATE : CONVERSATION_EVENTS.MESSAGE_UPDATE;
        const deleteEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.MESSAGE_DELETE : CONVERSATION_EVENTS.MESSAGE_DELETE;

        const queryKey = [`${type}-messages`, serverId, targetId];

        // Join room (channel or conversation)
        socket.emit(joinEvent, { serverId: serverId, [`${type}Id`]: targetId });

        const handleNewMessage = (message: Message) => {
            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) => index === 0 ? { ...page, messages: [message, ...page.messages] } : page)
                }
            });
        }

        const updateCache = (updater: (msg: Message) => any | null) => {
            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: MessagesPage) => ({
                        ...page,
                        messages: page.messages
                            .map((msg: Message) => updater(msg))
                            .filter(value => Boolean(value)),
                    }))
                }
            });
        }

        const handleUpdateMessage = (updatedMessage: Message) => updateCache((msg) => msg._id === updatedMessage._id ? updatedMessage : msg);

        const handleDeleteMessage = (deletedMessage: Message) => updateCache((msg) => msg._id === deletedMessage._id ? deletedMessage : msg);

        // Register listeners
        socket.on(newEvent, handleNewMessage);
        socket.on(updateEvent, handleUpdateMessage);
        socket.on(deleteEvent, handleDeleteMessage);

        return () => {
            socket.emit(leaveEvent, { [`${type}Id`]: targetId });

            socket.off(newEvent, handleNewMessage);
            socket.off(updateEvent, handleUpdateMessage);
            socket.off(deleteEvent, handleDeleteMessage);
        }
    }, [socket, isConnected, serverId, targetId, type]);
}
