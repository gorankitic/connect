// api
import api from "@/lib/api/apiClient";
// types
import type { CreateChannelMessageResponse, CreateConversationMessageResponse, GetChannelMessagesParams, GetChannelMessagesResponse, GetConversationMessagesParams, GetConversationMessagesResponse } from "@/lib/api/apiTypes";
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

export const createConversationMessageApi = async ({ serverId, conversationId, body }: { serverId: string, conversationId: string, body: UpsertMessageSchema }) => {
    const { data } = await api.post<CreateConversationMessageResponse>(`/servers/${serverId}/conversations/${conversationId}/messages`, body);
    return data.data;
}

export const getConversationMessagesApi = async ({ serverId, conversationId, limit, cursor }: GetConversationMessagesParams) => {
    const { data } = await api.get<GetConversationMessagesResponse>(`/servers/${serverId}/conversations/${conversationId}/messages`, { params: { limit, cursor } });
    return data.data;
}