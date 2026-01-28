// modules
import { Types } from "mongoose";
// constants
import { MESSAGE_TYPE } from "@/lib/constants/message.constants";
// types
import { MemberRole } from "@/lib/types/member.types";

export type MessageType = typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE];

export type CreateChannelMessageDTO = {
    content: string;
    serverId: string;
    channelId: string;
    currentMemberId: string;
}

export type GetChannelMessagesDTO = {
    serverId: string;
    channelId: string;
    limit?: number;
    cursor?: string;
}

export type CreateConversationMessageDTO = {
    content: string;
    serverId: string;
    conversationId: string;
    currentMemberId: string;
}

export type GetConversationMessagesDTO = {
    serverId: string;
    conversationId: string;
    currentMemberId: string;
    limit?: number;
    cursor?: string;
}

export type UpdateMessageDTO = {
    content: string;
    messageId: string;
    currentMemberId: Types.ObjectId;
    type: MessageType;
}

export type DeleteMessageDTO = {
    messageId: string;
    memberId: Types.ObjectId;
    memberRole: MemberRole;
    type: MessageType;
}

export type CanDeleteMessageDTO = {
    messageAuthorId: Types.ObjectId;
    messageAuthorRole: MemberRole;
    memberId: Types.ObjectId;
    memberRole: MemberRole;
}

export interface MessageSender {
    _id: Types.ObjectId;
    role: MemberRole;
}