// constants
import type { CHANNEL_TYPE_OPTIONS } from "@/lib/constants/channel.constants";

export type ChannelType = typeof CHANNEL_TYPE_OPTIONS[number]["value"];

export type Channel = {
    _id: string;
    name: string;
    type: ChannelType;
    createdAt: string;
};

