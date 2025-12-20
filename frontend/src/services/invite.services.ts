// api
import api from "@/lib/api/apiClient";
// types
import type { JoinServerResponse, SuccessResponse } from "@/lib/api/apiTypes";

export const joinServerApi = async (inviteCode: string) => {
    const { data } = await api.post<JoinServerResponse>(`/invites/${inviteCode}`);
    return data.data;
}

export const generateInviteCodeApi = async ({ serverId }: { serverId: string }) => {
    const { data } = await api.patch<SuccessResponse>(`/servers/${serverId}/invite-code`);
    return data;
}