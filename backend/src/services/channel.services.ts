// models
import { Channel } from "@/models/channel.model";
// types
import { CreateChannelDTO } from "@/lib/types/channel.types";

export const createNewChannel = async ({ name, type, server }: CreateChannelDTO) => {

    const channel = await Channel.create({ name, type, server });

    return channel;
}