// lib
import { Hash, Mic, Video, type LucideIcon } from "lucide-react";
// types
import type { ChannelType } from "@/lib/types/channel.types";

export const CHANNEL_TYPE_OPTIONS = [
    { value: "TEXT", label: "Text", icon: Hash },
    { value: "AUDIO", label: "Audio", icon: Mic },
    { value: "VIDEO", label: "Video", icon: Video },
] as const;

export const CHANNEL_TYPES = CHANNEL_TYPE_OPTIONS.map((opt) => opt.value) as [ChannelType];

export const CHANNEL_TYPE_ICON_MAP = Object.fromEntries(
    CHANNEL_TYPE_OPTIONS.map(opt => [opt.value, opt.icon])
) as Record<ChannelType, LucideIcon>;