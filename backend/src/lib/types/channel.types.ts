// constants
import { CHANNEL_TYPES } from "@/lib/constants";
// schemas
import { CreateChannelSchema } from "@/lib/schemas/channel.schemas";

export type ChannelType = typeof CHANNEL_TYPES[number];

export type CreateChannelDTO = {
    data: CreateChannelSchema,
    serverId: string,
}