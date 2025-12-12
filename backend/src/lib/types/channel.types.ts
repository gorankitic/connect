// modules
import { Types } from "mongoose";

export type ChannelType = "TEXT" | "AUDIO" | "VIDEO";

export interface CreateChannelDTO {
    name: string,
    type?: ChannelType,
    server: Types.ObjectId,
}