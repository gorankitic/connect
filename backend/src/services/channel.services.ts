// models
import { Channel } from "@/models/channel.model";
// types
import { CreateChannelDTO, DeleteChannelDTO, GetChannelsDTO, UpdateChannelDTO } from "@/lib/types/channel.types";
// utils
import { AppError } from "@/lib/utils/AppError";

export const createNewChannel = async ({ data, serverId }: CreateChannelDTO) => {
    const { name, type } = data;
    // 1) Ensure that server exist. Already done in restrictTo middleware
    // 2) Prevent creating default channel. Already done in validation createChannelSchema
    //    Zod can be bypassed (different route, future refactor), keep business rules in service
    if (name.trim().toLowerCase() === "general") {
        throw new AppError("The 'general' channel already exists and cannot be recreated.", 400);
    }
    // 3) Create channel document
    const channel = await Channel.create({ name, type, server: serverId });

    return channel;
}

export const findAllChannels = async ({ serverId }: GetChannelsDTO) => {

    const channels = await Channel
        .find({ server: serverId })
        .select("name type createdAt")
        .sort({ createdAt: 1 })
        .lean();

    return channels;
}

export const updateChannelById = async ({ data, serverId, channelId }: UpdateChannelDTO) => {
    const { name, type } = data;
    // 1) Ensure that server exist. Already done in restrictTo middleware
    // 2) Prevent updating channel name to general. Already done in validation createChannelSchema
    if (name.trim().toLowerCase() === "general") {
        throw new AppError("The 'general' channel already exists and cannot be recreated.", 400);
    }
    // 3) Check if requested channel exists in the server
    const channel = await Channel.findOne({ _id: channelId, server: serverId, });
    if (!channel) {
        throw new AppError("Channel not found.", 404);
    }
    // 4) Don't allow modification of general channel
    if (channel.name === "general") {
        throw new AppError("The 'general' channel cannot be modified.", 403);
    }

    // 3) Update allowed channel fields
    channel.name = name;
    channel.type = type;
    await channel.save();

    return channel;
}

export const deleteChannelById = async ({ serverId, channelId }: DeleteChannelDTO) => {
    // 1) Check if requested channel exists in the server
    const channel = await Channel.findOne({ _id: channelId, server: serverId });
    if (!channel) {
        throw new AppError("Channel not found.", 404);
    }

    // 2) Prevent deleting default 'general' channel
    if (channel.name === "general") {
        throw new AppError("The 'general' channel cannot be deleted.", 403);
    }

    // 3) Delete channel
    await channel.deleteOne();

    return channel;
}