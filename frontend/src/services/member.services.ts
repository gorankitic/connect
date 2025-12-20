// api
import api from "@/lib/api/apiClient";
// types
import type { GetMemberResponse, GetMembersResponse, SuccessResponse } from "@/lib/api/apiTypes";
import type { MemberRole } from "@/lib/types/member.types";

export const getMembersApi = async ({ serverId }: { serverId: string }) => {
    const { data } = await api.get<GetMembersResponse>(`/servers/${serverId}/members`);
    return data.data.members;
}

export const getMemberApi = async ({ serverId }: { serverId: string }) => {
    const { data } = await api.get<GetMemberResponse>(`/servers/${serverId}/members/me`);
    return data.data.member;
}

export const updateMemberRoleApi = async ({ serverId, memberId, role }: { serverId: string, memberId: string, role: MemberRole }) => {
    const { data } = await api.patch<SuccessResponse>(`/servers/${serverId}/members/${memberId}`, { role });
    return data;
}

export const removeMemberApi = async ({ serverId, memberId }: { serverId: string, memberId: string }) => {
    const { data } = await api.delete<SuccessResponse>(`/servers/${serverId}/members/${memberId}`);
    return data;
}