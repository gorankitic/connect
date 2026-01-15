// models
import { Message } from "@/models/message.model";
// types
import { CreateChannelMessageDTO, CreateConversationMessageDTO, GetChannelMessagesDTO, GetConversationMessagesDTO } from "@/lib/types/message.types";
// utils
import { AppError } from "@/lib/utils/AppError";
import { decodeCursor, encodeCursor } from "@/lib/utils/cursor";
import { buildOlderThanCursorFilter, clampLimit } from "@/lib/utils/pagination";
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