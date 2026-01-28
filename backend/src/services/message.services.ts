// models
import { Message } from "@/models/message.model";
// constants
import { MESSAGE_TYPE } from "@/lib/constants/message.constants";
// types
import { CreateChannelMessageDTO, CreateConversationMessageDTO, DeleteMessageDTO, GetChannelMessagesDTO, GetConversationMessagesDTO, MessageSender, UpdateMessageDTO } from "@/lib/types/message.types";
// utils
import { AppError } from "@/lib/utils/AppError";
import { decodeCursor, encodeCursor } from "@/lib/utils/cursor";
import { buildOlderThanCursorFilter, clampLimit } from "@/lib/utils/pagination";
import { canDeleteMessage } from "@/lib/utils/helpers";
// services
import { assertConversationAccess } from "@/services/conversation.services";
import { assertChannelAccess } from "@/services/channel.services";

export const createNewChannelMessage = async ({ content, serverId, channelId, currentMemberId }: CreateChannelMessageDTO) => {
    // Ensure that channel exists in this server
    await assertChannelAccess({ serverId, channelId });

    const created = await Message.create({
        content,
        sender: currentMemberId,
        server: serverId,
        channel: channelId
    });

    const message = await Message
        .findById(created._id)
        .populate({ path: "sender", populate: { path: "user", select: "name avatarUuid" } });

    return message;
}

export const getMessagesByChannel = async ({ serverId, channelId, limit, cursor }: GetChannelMessagesDTO) => {
    // 1) Ensure that channel exists in this server
    await assertChannelAccess({ serverId, channelId });

    // 2) Limit client request, minimum = 1, maximum = 30;
    const take = clampLimit(limit ?? 30);

    // 3) Base filter for this channel
    //    If there is no cursor query messages by base filter
    const filter: Record<string, any> = { channel: channelId, deletedAt: null };

    // 4) If cursor exists, add "older than cursor" filter
    if (cursor) {
        let decodedCursor;
        try {
            decodedCursor = decodeCursor(cursor);
        } catch {
            throw new AppError("Invalid cursor.", 400);
        }
        Object.assign(filter, buildOlderThanCursorFilter(decodedCursor));
    }

    // 5) Query messages, add one more to compute nextCursor
    const docs = await Message
        .find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .populate({ path: "sender", populate: { path: "user" } })
        .limit(take + 1)
        .lean();

    const hasMore = docs.length > take;
    const page = hasMore ? docs.slice(0, take) : docs;

    // 6) nextCursor is based on the last (oldest) message in the returned page
    const last = page[page.length - 1];
    const nextCursor = hasMore && last
        ? encodeCursor({ createdAt: new Date(last.createdAt).toISOString(), id: String(last._id) })
        : null;

    return { messages: page, nextCursor };
}

export const createNewConversationMessage = async ({ content, serverId, conversationId, currentMemberId }: CreateConversationMessageDTO) => {
    // Ensure that conversation exist and that participant is member of conversation
    await assertConversationAccess({ serverId, conversationId, currentMemberId });

    const created = await Message.create({
        content,
        sender: currentMemberId,
        server: serverId,
        conversation: conversationId
    });

    const message = await Message
        .findById(created._id)
        .populate({ path: "sender", populate: { path: "user", select: "name avatarUuid" } });

    return message;
}

export const getMessagesByConversation = async ({ serverId, conversationId, currentMemberId, limit, cursor }: GetConversationMessagesDTO) => {
    // 1) Ensure that conversation exist and that participant is member of conversation
    await assertConversationAccess({ serverId, conversationId, currentMemberId });

    // 2) Limit client request, minimum = 1, maximum = 30;
    const take = clampLimit(limit ?? 30);

    // 3) Base filter for this conversation
    //    If there is no cursor query messages by base filter
    const filter: Record<string, any> = { conversation: conversationId, deletedAt: null };

    // 4) If cursor exists, add "older than cursor" filter
    if (cursor) {
        let decodedCursor;
        try {
            decodedCursor = decodeCursor(cursor);
        } catch {
            throw new AppError("Invalid cursor.", 400);
        }
        Object.assign(filter, buildOlderThanCursorFilter(decodedCursor));
    }

    // 5) Query messages, add one more to compute nextCursor
    const docs = await Message
        .find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .populate({ path: "sender", populate: { path: "user" } })
        .limit(take + 1)
        .lean();

    const hasMore = docs.length > take;
    const page = hasMore ? docs.slice(0, take) : docs;

    // 6) nextCursor is based on the last (oldest) message in the returned page
    const last = page[page.length - 1];
    const nextCursor = hasMore && last
        ? encodeCursor({ createdAt: new Date(last.createdAt).toISOString(), id: String(last._id) })
        : null;

    return { messages: page, nextCursor };
}

export const updateMessage = async ({ content, messageId, currentMemberId, type }: UpdateMessageDTO) => {
    // 1) Find requested message by messageId & message type
    const query: any = { _id: messageId };
    if (type === MESSAGE_TYPE.CHANNEL) query.channel = { $ne: null };
    if (type === MESSAGE_TYPE.CONVERSATION) query.conversation = { $ne: null };

    const message = await Message
        .findOne(query)
        .populate({ path: "sender", populate: { path: "user" } });

    if (!message) {
        throw new AppError("Document not found.", 404);
    }

    // 2) Check if user is allowed to update message document
    if (String(message.sender._id) !== String(currentMemberId)) {
        throw new AppError("You are not allowed to update this message.", 403);
    }

    // 3) Prevent updating deleted messages
    if (message.deletedAt) {
        throw new AppError("Cannot update a deleted message.", 400);
    }

    // 4) Do not update if content is not changed
    if (message.content === content) {
        return message;
    }

    // 5) Update message content
    message.content = content;
    await message.save();

    return message;
}

export const deleteMessage = async ({ messageId, memberId, memberRole, type }: DeleteMessageDTO) => {
    // 1) Find requested message by messageId & message type
    const query: any = { _id: messageId };
    if (type === MESSAGE_TYPE.CHANNEL) query.channel = { $ne: null };
    if (type === MESSAGE_TYPE.CONVERSATION) query.conversation = { $ne: null };

    const message = await Message
        .findOne(query)
        .populate<{ sender: MessageSender }>({ path: "sender", populate: { path: "user" } });

    if (!message) {
        throw new AppError("Document not found.", 404);
    }

    // 2) Prevent deleting already deleted message
    if (message.deletedAt) {
        throw new AppError("Message already deleted.", 400);
    }

    // 3) Authorize who can delete message
    if (!canDeleteMessage({ messageAuthorId: message.sender._id, messageAuthorRole: message.sender.role, memberId, memberRole })) {
        throw new AppError("You are not allowed to delete this message.", 403);
    }

    // 4) Soft delete
    message.deletedAt = new Date();
    await message.save();

    return message;
}