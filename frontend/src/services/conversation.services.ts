// api
import api from "@/lib/api/apiClient";
// types
import type { GetOrCreateConversationResponse } from "@/lib/api/apiTypes";

export const getOrCreateConversationApi = async ({ serverId, memberId }: { serverId: string, memberId: string }) => {
    const { data } = await api.post<GetOrCreateConversationResponse>(`/servers/${serverId}/conversations`, { memberId });
    return data.data;
}

export const getConversationApi = async ({ serverId, conversationId }: { serverId: string, conversationId: string }) => {
    const { data } = await api.get<GetOrCreateConversationResponse>(`/servers/${serverId}/conversations/${conversationId}`,);
    return data.data.conversation;
}
