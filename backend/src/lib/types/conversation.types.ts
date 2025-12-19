import { Types } from "mongoose"

export type GetOrCreateConversationDTO = {
    serverId: string,
    memberId: string,
    currentMemberId: string
}

export type AssertConversationAccessDTO = {
    serverId: string,
    conversationId: string,
    currentMemberId: string
}