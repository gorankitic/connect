// modules
import { Types } from "mongoose"

export type GetOrCreateConversationDTO = {
    serverId: string,
    memberId: string,
    currentMemberId: Types.ObjectId;
}

export type ConversationDTO = {
    serverId: string,
    conversationId: string,
    currentMemberId: Types.ObjectId;
}