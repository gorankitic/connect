// lib
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// types
import type { ChatType } from "@/lib/types/chat.types";
// hooks
import { useSocket } from "@/hooks/useSocket";

export const useChatSocket = ({ serverId, targetId, type }: { serverId?: string, targetId?: string, type: ChatType }) => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!serverId || !targetId || !socket || !isConnected) return;

        const joinEvent = type === "channel" ? "channel:join" : "conversation:join";
        const leaveEvent = type === "channel" ? "channel:leave" : "conversation:leave";
        const newEvent = type === "channel" ? "channel:message:new" : "conversation:message:new";
        const updateEvent = type === "channel" ? "channel:message:update" : "conversation:message:update";
        const deleteEvent = type === "channel" ? "channel:message:delete" : "conversation:message:delete";

        const queryKey = [`${type}-messages`, serverId, targetId];

        // Join room (channel or conversation)
        socket.emit(joinEvent, { serverId: serverId, [`${type}Id`]: targetId });

        const updateCache = (updater: (msg: any) => any | null) => {
            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        messages: page.messages
                            .map((msg: any) => updater(msg))
                            .filter(Boolean),
                    }))
                }
            })
        }

        const handleNewMessage = (message: any) => {
            queryClient.setQueryData(queryKey, (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) => index === 0 ? { ...page, messages: [message, ...page.messages] } : page)
                }
            });
        }

        const handleUpdateMessage = (updatedMessage: any) => updateCache((msg) => msg._id === updatedMessage._id ? updatedMessage : msg);

        const handleDeleteMessage = ({ messageId }: { messageId: string }) => {
            updateCache((msg) => msg._id === messageId
                ? {
                    ...msg,
                    content: "This message was deleted",
                    deletedAt: new Date().toISOString(),
                }
                : msg
            );
        }

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
    }, [socket, isConnected, targetId]);
}
