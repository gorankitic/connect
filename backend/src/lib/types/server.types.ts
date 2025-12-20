// types
import type { UpsertServerSchema } from "@/lib/schemas/server.schemas";

export type CreateServerDTO = {
    name: string,
    avatarUuid: string,
    owner: string,
}

export type GetServersDTO = {
    userId: string
}

export type GetServerDTO = {
    serverId: string
}

export type UpdateServerDTO = {
    serverId: string,
    body: UpsertServerSchema
}

export type DeleteServerDTO = {
    serverId: string
}

export type CreateNewInviteCodeDTO = {
    serverId: string
}