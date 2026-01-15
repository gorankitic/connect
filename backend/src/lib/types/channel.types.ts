// constants
import { CHANNEL_TYPES } from "@/lib/constants";
// schemas
import { UpsertChannelSchema } from "@/lib/schemas/channel.schemas";

export type ChannelType = typeof CHANNEL_TYPES[number];

export type CreateChannelDTO = {
    data: UpsertChannelSchema,
    serverId: string,
}

export type GetChannelsDTO = {
    serverId: string
}

export type UpdateChannelDTO = {
    data: UpsertChannelSchema,
    serverId: string,
    channelId: string
}

export type DeleteChannelDTO = {
    serverId: string,
    channelId: string
}

export type AssertChannelAccessDTO = {
    serverId: string;
    channelId: string;
}