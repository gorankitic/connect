// api
import api from "@/lib/api/apiClient";
// types
import type { CreateServerResponse, GetServerResponse, GetServersResponse, SuccessResponse } from "@/lib/api/apiTypes";
// schemas
import type { UpsertServerSchema } from "@/lib/schemas/server.schema";

export const createServerApi = async ({ name, avatarUuid }: UpsertServerSchema) => {
    const { data } = await api.post<CreateServerResponse>("/servers", { name, avatarUuid });
    return data.data;
}

export const getServersApi = async () => {
    const { data } = await api.get<GetServersResponse>("/servers");
    return data.data.servers;
}

export const getServerApi = async (serverId: string) => {
    const { data } = await api.get<GetServerResponse>(`/servers/${serverId}`);
    return data.data.server;
}

export const updateServerApi = async ({ serverId, name, avatarUuid }: { serverId: string, name: string, avatarUuid: string }) => {
    const { data } = await api.patch<SuccessResponse>(`/servers/${serverId}`, { name, avatarUuid });
    return data;
}

export const leaveServerApi = async ({ serverId }: { serverId: string }) => {
    const { data } = await api.delete<SuccessResponse>(`/servers/${serverId}/members`);
    return data;
}

export const deleteServerApi = async ({ serverId }: { serverId: string }) => {
    const { data } = await api.delete<SuccessResponse>(`/servers/${serverId}`);
    return data;
}