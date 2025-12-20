// utils
import { AppError } from "@/lib/utils/AppError";
// types
import { AssertConversationAccessDTO, GetConversationDTO, GetOrCreateConversationDTO } from "@/lib/types/conversation.types";
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
    const conversationDoc = await Conversation.findOne({ server: serverId, memberOne, memberTwo });
    if (!conversationDoc) {
        try {
            // If such conversation does not exists create a new one
            await Conversation.create({ server: serverId, memberOne, memberTwo });
        } catch (err: any) {
            // Handle rare race condition (duplicate key)
            // Skip errors with code 11000, conversation already exists, find it
            if (err.code !== 11000) throw err;
        }
    }

    const conversation = await Conversation
        .findOne({ server: serverId, memberOne, memberTwo })
        .populate({ path: "memberOne", populate: { path: "user", select: "name avatarUuid" } })
        .populate({ path: "memberTwo", populate: { path: "user", select: "name avatarUuid" } })
        .lean();

    if (!conversation) {
        throw new AppError("Conversation creation failed", 500);
    }

    return conversation;
}

export const findConversationById = async ({ serverId, conversationId, currentMemberId }: GetConversationDTO) => {

    const conversation = await Conversation
        .findOne({
            _id: conversationId,
            server: serverId,
            $or: [{ memberOne: currentMemberId }, { memberTwo: currentMemberId }]
        })
        .populate({ path: "memberOne", populate: { path: "user", select: "name avatarUuid" } })
        .populate({ path: "memberTwo", populate: { path: "user", select: "name avatarUuid" } })
        .lean();

    if (!conversation) {
        throw new AppError("Conversation not found.", 404);
    }

    return conversation;
}

export const assertConversationAccess = async ({ serverId, conversationId, currentMemberId }: AssertConversationAccessDTO) => {

    const conversation = await Conversation
        .findOne({
            _id: conversationId,
            server: serverId,
            $or: [{ memberOne: currentMemberId }, { memberTwo: currentMemberId }]
        });

    // Either conversation does not exist in this server or member is not participant in conversation
    if (!conversation) {
        throw new AppError("Conversation not found.", 404);
    }

    return conversation;
}