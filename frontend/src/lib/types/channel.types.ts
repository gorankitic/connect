// constants
import type { CHANNEL_TYPE } from "@/lib/constants/channel.constants";

export type ChannelType = typeof CHANNEL_TYPE[keyof typeof CHANNEL_TYPE];

export type Channel = {
    _id: string;
    name: string;
    type: ChannelType;
    createdAt: string;
};

