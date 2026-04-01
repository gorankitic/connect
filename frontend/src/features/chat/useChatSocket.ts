// lib
import { useEffect } from "react";
// types
import type { ChatStoreData } from "@/lib/types/chat.types";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
import { CHANNEL_EVENTS } from "@/lib/constants/channel.constants";
import { CONVERSATION_EVENTS } from "@/lib/constants/conversation.constants";
// hooks
import { useSocket } from "@/hooks/useSocket";

// This hook is responsible for: 
// 1) "Presence" (joining/leaving rooms) 
// 2) Handling events that are very specific to the active view (typing indicators...)
export const useChatSocket = ({ serverId, targetId, type }: ChatStoreData) => {
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!serverId || !targetId || !socket || !isConnected || !type) return;

        const joinEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.CHANNEL_JOIN : CONVERSATION_EVENTS.CONVERSATION_JOIN;
        const leaveEvent = type === CHAT_TYPE.CHANNEL ? CHANNEL_EVENTS.CHANNEL_LEAVE : CONVERSATION_EVENTS.CONVERSATION_LEAVE;

        // Join room (channel or conversation)
        socket.emit(joinEvent, { serverId: serverId, [`${type}Id`]: targetId });

        return () => {
            socket.emit(leaveEvent, { [`${type}Id`]: targetId });
        }
    }, [socket, isConnected, serverId, targetId, type]);
}
