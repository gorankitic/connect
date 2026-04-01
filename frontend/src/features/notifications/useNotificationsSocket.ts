// lib
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// hooks
import { useSocket } from "@/hooks/useSocket";
// constants
import { NOTIFICATION_EVENTS } from "@/lib/constants/notification.constants";
// types
import type { Notification } from "@/lib/api/apiTypes";

export const useNotificationsSocket = (serverId: string | undefined) => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !isConnected || !serverId) return;

        const handleSetNotification = ({ senderId }: Notification) => {
            queryClient.setQueryData(["notifications", serverId], (oldData: Notification[] = []) => {
                if (!oldData) return oldData;

                const exists = oldData.find((n: Notification) => n.senderId === senderId);
                if (exists) {
                    return oldData.map((n: Notification) => n.senderId === senderId ? { ...n, unreadCount: n.unreadCount + 1 } : n);
                }

                return [...oldData, { senderId, unreadCount: 1 }]
            });
        }

        const handleResetNotification = ({ senderId }: Notification) => {
            queryClient.setQueryData(["notifications", serverId], (oldData: Notification[] = []) => {
                return oldData.map((n: Notification) => n.senderId === senderId ? { ...n, unreadCount: 0 } : n);
            });
        }

        socket.on(NOTIFICATION_EVENTS.NOTIFICATION_SET, handleSetNotification);
        socket.on(NOTIFICATION_EVENTS.NOTIFICATION_RESET, handleResetNotification);

        return () => {
            socket.off(NOTIFICATION_EVENTS.NOTIFICATION_SET, handleSetNotification);
            socket.off(NOTIFICATION_EVENTS.NOTIFICATION_RESET, handleResetNotification);
        }
    }, [socket, isConnected, serverId]);
}