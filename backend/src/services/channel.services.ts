// models
import { Channel } from "@/models/channel.model";
// types
import { CreateChannelDTO } from "@/lib/types/channel.types";
// utils
import { AppError } from "@/lib/utils/AppError";

export const createNewChannel = async ({ data, serverId }: CreateChannelDTO) => {
    const { name, type } = data;
    // 1) Ensure that server exist. Already done in restrictTo middleware
    // 2) Prevent creating default channel. Already done in validation createChannelSchema
    // Zod can be bypassed (different route, future refactor), keep business rules in service
    if (name.trim().toLowerCase() === "general") {
        throw new AppError("The 'general' channel already exists and cannot be recreated.", 400);
    }
    // 3) Create channel document
    const channel = await Channel.create({ name, type, server: serverId });

    return channel;
}