// utils
import { AppError } from "@/lib/utils/AppError";
// types
import { AssertConversationAccessDTO, GetOrCreateConversationDTO } from "@/lib/types/conversation.types";
// models
import { Conversation } from "@/models/conversation.model";
import { Member } from "@/models/member.model";

export const getOrCreate = async ({ serverId, memberId, currentMemberId }: GetOrCreateConversationDTO) => {
    // Prevent self conversation
    if (memberId === currentMemberId) {
        throw new AppError("You cannot start conversation with yourself.", 400);
    }
    // Check if targeted member exists in same server
    const member = await Member.findOne({ _id: memberId, server: serverId });
    if (!member) {
        throw new AppError("Member not found.", 404);
    }

    // Ensure one and only one DM conversation for a pair of members: read-time normalization
    // Members can start a DM in either direction: A → B || B → A
    // Enforce the same rule as the schema validate hook, but before querying
    // Hook forces a rule: Always store the smaller id first, bigger id second
    const [memberOne, memberTwo] = currentMemberId < memberId ? [currentMemberId, memberId] : [memberId, currentMemberId];

    // Try to find conversation based on serverId and two members
    let conversation = await Conversation.findOne({ server: serverId, memberOne, memberTwo });
    // If such conversation does not exists create a new one
    if (!conversation) {
        try {
            conversation = await Conversation.create({ server: serverId, memberOne, memberTwo });
        } catch (err: any) {
            // Handle rare race condition (duplicate key)
            // The race condition handling exists to make sure that two simultaneous “create if not exists” requests 
            // still result in exactly one conversation and zero user-facing errors
            if (err.code === 11000) {
                conversation = await Conversation.findOne({ server: serverId, memberOne, memberTwo });
            } else {
                throw err;
            }
        }
    }
    if (!conversation) {
        throw new AppError("Conversation creation failed", 500);
    }

    return conversation;
}

export const assertConversationAccess = async ({ serverId, conversationId, currentMemberId }: AssertConversationAccessDTO) => {
    // Ensure that conversation exists in this server
    const conversation = await Conversation.findOne({ _id: conversationId, server: serverId });
    if (!conversation) {
        throw new AppError("Conversation not found.", 404);
    }
    const memberOneId = conversation.memberOne.toString();
    const memberTwoId = conversation.memberTwo.toString();

    // Ensure that member is participant of conversation
    const isParticipant = memberOneId === currentMemberId || memberTwoId === currentMemberId;
    if (!isParticipant) {
        throw new AppError("You are not allowed to access this conversation.", 403);
    }
    return conversation;
}