// models
import { Message } from "@/models/message.model";
import { Channel } from "@/models/channel.model";
// types
import { CreateChannelMessageDTO, CreateConversationMessageDTO, GetChannelMessagesDTO, GetConversationMessagesDTO } from "@/lib/types/message.types";
// utils
import { AppError } from "@/lib/utils/AppError";
// services
import { assertConversationAccess } from "@/services/conversation.services";

export const createNewChannelMessage = async ({ content, serverId, channelId, currentMemberId }: CreateChannelMessageDTO) => {

    const message = await Message.create({
        content,
        sender: currentMemberId,
        server: serverId,
        channel: channelId
    });

    return message;
}

export const getMessagesByChannel = async ({ serverId, channelId }: GetChannelMessagesDTO) => {

    // Check if channel exists in this server
    const channel = await Channel.findOne({ _id: channelId, server: serverId });
    if (!channel) {
        throw new AppError("Channel not found.", 404);
    }

    const messages = await Message
        .find({ channel: channelId, deletedAt: null })
        .sort({ createdAt: 1 })
        .populate({ path: "sender", populate: { path: "user" } });

    return messages;
}

export const createNewConversationMessage = async ({ content, serverId, conversationId, currentMemberId }: CreateConversationMessageDTO) => {

    // Ensure that conversation exist and that participant is member of conversation
    await assertConversationAccess({ serverId, conversationId, currentMemberId });

    const message = await Message.create({
        content,
        sender: currentMemberId,
        server: serverId,
        conversation: conversationId
    });

    return message;
}

export const getMessagesByConversation = async ({ serverId, conversationId, currentMemberId }: GetConversationMessagesDTO) => {

    // Ensure that conversation exist and that participant is member of conversation
    await assertConversationAccess({ serverId, conversationId, currentMemberId });

    const messages = await Message
        .find({ conversation: conversationId, deletedAt: null })
        .sort({ createdAt: 1 })
        .populate({ path: "sender", populate: { path: "user" } });

    return messages;
}