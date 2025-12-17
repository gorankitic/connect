// api
import api from "@/lib/api/apiClient";
// types & schemas
import type { SuccessResponse } from "@/lib/api/apiTypes";
import type { UpsertChannelSchema } from "@/lib/schemas/channel.schema";

export const createChannelApi = async ({ serverId, body }: { serverId: string, body: UpsertChannelSchema }) => {
    const { data } = await api.post<SuccessResponse>(`/servers/${serverId}/channels`, body);
    return data;
}

export const updateChannelApi = async ({ serverId, channelId, body }: { serverId: string, channelId: string, body: UpsertChannelSchema }) => {
    const { data } = await api.patch<SuccessResponse>(`/servers/${serverId}/channels/${channelId}`, body);
    return data;
}

export const deleteChannelApi = async ({ serverId, channelId }: { serverId: string, channelId: string }) => {
    const { data } = await api.delete<SuccessResponse>(`/servers/${serverId}/channels/${channelId}`);
    return data;
}