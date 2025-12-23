// lib
import type { LucideIcon } from "lucide-react";
// types
import type { MemberRole } from "@/lib/types/member.types";

export type ChatVariant = "channel" | "conversation";

export type ChannelHeaderProps = {
    variant: "channel";
    name: string;
    Icon: LucideIcon;
};

export type ConversationHeaderProps = {
    variant: "conversation";
    name: string;
    avatarUuid: string;
    role: MemberRole;
    Icon: LucideIcon;
};