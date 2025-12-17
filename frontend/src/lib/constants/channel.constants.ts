// lib
import { Hash, Mic, Video, type LucideIcon } from "lucide-react";

export const CHANNEL_TYPE_OPTIONS = [
    { value: "TEXT", label: "Text", icon: Hash },
    { value: "AUDIO", label: "Audio", icon: Mic },
    { value: "VIDEO", label: "Video", icon: Video },
] as const;

export type ChannelType = typeof CHANNEL_TYPE_OPTIONS[number]["value"];

export const CHANNEL_TYPES = CHANNEL_TYPE_OPTIONS.map((opt) => opt.value) as [ChannelType];

export const CHANNEL_TYPE_ICON_MAP = Object.fromEntries(
    CHANNEL_TYPE_OPTIONS.map(opt => [opt.value, opt.icon])
) as Record<ChannelType, LucideIcon>;