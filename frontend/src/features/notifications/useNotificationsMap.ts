// lib
import { useMemo } from "react";
// hooks
import { useNotifications } from "@/features/notifications/useNotifications";
// types
import type { Notification } from "@/lib/api/apiTypes";

export const useNotificationsMap = (serverId: string | undefined) => {
    const { notifications } = useNotifications(serverId);

    const notificationsMap = useMemo(() => {
        const map = new Map<string, number>();
        notifications?.forEach((n: Notification) => {
            map.set(n.senderId, n.unreadCount)
        })
        return map;
    }, [notifications]);

    return { notificationsMap }
}