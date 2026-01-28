// lib
import { Hash, Mic, Video, type LucideIcon } from "lucide-react";
// types
import type { ChannelType } from "@/lib/types/channel.types";

export const CHANNEL_TYPE = {
    TEXT: "TEXT",
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
} as const;

export const CHANNEL_TYPE_OPTIONS = [
    { value: CHANNEL_TYPE.TEXT, label: "Text", icon: Hash },
    { value: CHANNEL_TYPE.AUDIO, label: "Audio", icon: Mic },
    { value: CHANNEL_TYPE.VIDEO, label: "Video", icon: Video },
] as const;

export const CHANNEL_TYPE_ICON_MAP: Record<ChannelType, LucideIcon> = {
    [CHANNEL_TYPE.TEXT]: Hash,
    [CHANNEL_TYPE.AUDIO]: Mic,
    [CHANNEL_TYPE.VIDEO]: Video,
};

export const CHANNEL_EVENTS = {
    CHANNEL_JOIN: "channel:join",
    CHANNEL_LEAVE: "channel:leave",
    MESSAGE_CREATE: "channel:message:create",
    MESSAGE_UPDATE: "channel:message:update",
    MESSAGE_DELETE: "channel:message:delete",
} as const;