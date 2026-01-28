// api
import api from "@/lib/api/apiClient";
// types
import type { CreateMessageParams, GetMessagesParams, MessagesResponse, MessageResponse, UpdateMessageParams, DeleteMessageParams } from "@/lib/api/apiTypes";

export const createChannelMessageApi = async ({ serverId, targetId, body }: CreateMessageParams) => {
    const { data } = await api.post<MessageResponse>(`/servers/${serverId}/channels/${targetId}/messages`, body);
    return data.data;
}

export const getChannelMessagesApi = async ({ serverId, targetId, limit, cursor }: GetMessagesParams) => {
    const { data } = await api.get<MessagesResponse>(`/servers/${serverId}/channels/${targetId}/messages`, { params: { limit, cursor } });
    return data.data;
}

export const updateChannelMessageApi = async ({ serverId, targetId, messageId, body }: UpdateMessageParams) => {
    const { data } = await api.patch<MessageResponse>(`/servers/${serverId}/channels/${targetId}/messages/${messageId}`, body);
    return data.data;
}

export const deleteChannelMessageApi = async ({ serverId, targetId, messageId }: DeleteMessageParams) => {
    const { data } = await api.delete<MessageResponse>(`/servers/${serverId}/channels/${targetId}/messages/${messageId}`);
    return data.data;
}

export const createConversationMessageApi = async ({ serverId, targetId, body }: CreateMessageParams) => {
    const { data } = await api.post<MessageResponse>(`/servers/${serverId}/conversations/${targetId}/messages`, body);
    return data.data;
}

export const getConversationMessagesApi = async ({ serverId, targetId, limit, cursor }: GetMessagesParams) => {
    const { data } = await api.get<MessagesResponse>(`/servers/${serverId}/conversations/${targetId}/messages`, { params: { limit, cursor } });
    return data.data;
}

export const updateConversationMessageApi = async ({ serverId, targetId, messageId, body }: UpdateMessageParams) => {
    const { data } = await api.patch<MessageResponse>(`/servers/${serverId}/conversations/${targetId}/messages/${messageId}`, body);
    return data.data;
}

export const deleteConversationMessageApi = async ({ serverId, targetId, messageId }: DeleteMessageParams) => {
    const { data } = await api.delete<MessageResponse>(`/servers/${serverId}/conversations/${targetId}/messages/${messageId}`);
    return data.data;
}