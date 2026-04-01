// lib
import { useQuery } from "@tanstack/react-query";
// services
import { getNotificationsApi } from "@/services/notification.services";

export const useNotifications = (serverId: string | undefined) => {
    const { data, isPending } = useQuery({
        queryKey: ["notifications", serverId],
        queryFn: () => getNotificationsApi({ serverId: serverId! }),
        enabled: !!serverId,
    });

    return { notifications: data ?? [], isPending };
}