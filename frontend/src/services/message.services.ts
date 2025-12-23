// api
import api from "@/lib/api/apiClient";
// types
import type { CreateChannelMessageResponse, GetChannelMessagesParams, GetChannelMessagesResponse } from "@/lib/api/apiTypes";
// schemas
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";

export const createChannelMessageApi = async ({ serverId, channelId, body }: { serverId: string, channelId: string, body: UpsertMessageSchema }) => {
    const { data } = await api.post<CreateChannelMessageResponse>(`/servers/${serverId}/channels/${channelId}/messages`, body);
    return data.data;
}

export const getChannelMessagesApi = async ({ serverId, channelId, limit, cursor }: GetChannelMessagesParams) => {
    const { data } = await api.get<GetChannelMessagesResponse>(`/servers/${serverId}/channels/${channelId}/messages`, { params: { limit, cursor } });
    return data.data;
}