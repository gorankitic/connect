// api
import api from "@/lib/api/apiClient";
// types
import type { GetNotificationsParams, NotificationsResponse } from "@/lib/api/apiTypes";

export const getNotificationsApi = async ({ serverId }: GetNotificationsParams) => {
    const { data } = await api.get<NotificationsResponse>(`/servers/${serverId}/notifications`);
    return data.data.notifications;
}