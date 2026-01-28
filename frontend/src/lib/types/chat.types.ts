// lib
import type { LucideIcon } from "lucide-react";
// types
import type { MemberRole } from "@/lib/types/member.types";
// constants
import type { CHAT_TYPE } from "@/lib/constants/chat.contants";

export type ChatType = typeof CHAT_TYPE[keyof typeof CHAT_TYPE];

export type ChannelHeaderProps = {
    type: typeof CHAT_TYPE.CHANNEL;
    name: string;
    Icon: LucideIcon;
};

export type ConversationHeaderProps = {
    type: typeof CHAT_TYPE.CONVERSATION;
    name: string;
    avatarUuid: string;
    role: MemberRole;
    Icon: LucideIcon;
};

export type ChatStoreData = {
    type: ChatType | undefined;
    serverId: string | undefined;
    targetId: string | undefined;
}