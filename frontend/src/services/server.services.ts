// api
import api from "@/lib/api/apiClient";
// types & schemas
import type { CreateServerResponse, Server, ServerLite } from "@/lib/api/apiTypes";
import type { CreateServerSchema } from "@/lib/schemas/server.schema";

export const createServerApi = async ({ name, avatarUuid }: CreateServerSchema) => {
    const { data } = await api.post<CreateServerResponse>("/servers", { name, avatarUuid });
    return data;
}

export const getServersApi = async (): Promise<ServerLite[]> => {
    const { data } = await api.get("/servers");
    return data.servers;
}

export const getServerApi = async (serverId: string): Promise<Server> => {
    const { data } = await api.get(`/servers/${serverId}`);
    return data.server;
}