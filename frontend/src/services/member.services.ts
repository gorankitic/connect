// api
import api from "@/lib/api/apiClient";
// types
import type { GetMembersResponse, MemberRole, SuccessResponse } from "@/lib/api/apiTypes";

export const getMembersApi = async (serverId: string) => {
    const { data } = await api.get<GetMembersResponse>(`/servers/${serverId}/members`);
    return data;
}

export const updateMemberRoleApi = async ({ serverId, memberId, role }: { serverId: string, memberId: string, role: MemberRole }) => {
    const { data } = await api.patch<SuccessResponse>(`/servers/${serverId}/members/${memberId}`, { role });
    return data;
}

export const removeMemberApi = async ({ serverId, memberId }: { serverId: string, memberId: string }) => {
    const { data } = await api.delete<SuccessResponse>(`/servers/${serverId}/members/${memberId}`);
    return data;
}