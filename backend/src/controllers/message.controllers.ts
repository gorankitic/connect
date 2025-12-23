// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMessage } from "@/lib/utils/formatting";
// services
import { createNewChannelMessage, createNewConversationMessage, getMessagesByChannel, getMessagesByConversation } from "@/services/message.services";

// Create a channel message
// POST method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages
// Restricted route to all server members
export const createChannelMessage = catchAsync(async (req, res) => {
    const { channelId, serverId } = req.params;
    const currentMemberId = String(req.member._id);
    // Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    const message = await createNewChannelMessage({ content, serverId, channelId, currentMemberId });

    const formattedMessage = formatMessage(message);

    res.status(201).json({
        status: "success",
        data: {
            message: formattedMessage
        }
    });
});

// Get all channel messages
// GET method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages
// Restricted route to all server members
export const getChannelMessages = catchAsync(async (req, res) => {
    const { serverId, channelId } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const cursor = req.query.cursor ? String(req.query.cursor) : undefined;

    const { messages, nextCursor } = await getMessagesByChannel({ serverId, channelId, limit, cursor });

    const formattedMessages = messages.map(formatMessage);

    res.status(200).json({
        status: "success",
        results: formattedMessages.length,
        data: {
            messages: formattedMessages,
            nextCursor
        }
    });
});

// Create a conversation message
// POST method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages
// Restricted route to all server members
export const createConversationMessage = catchAsync(async (req, res) => {
    const { conversationId, serverId } = req.params;
    const currentMemberId = String(req.member._id);
    // Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    const message = await createNewConversationMessage({ content, serverId, conversationId, currentMemberId });

    res.status(201).json({
        status: "success",
        message
    });
});

// Get all conversation messages
// GET method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages
// Restricted route to all server members
export const getConversationMessages = catchAsync(async (req, res) => {
    const { serverId, conversationId } = req.params;
    const currentMemberId = String(req.member._id);

    const messages = await getMessagesByConversation({ serverId, conversationId, currentMemberId });

    const formattedMessages = messages.map(formatMessage);

    res.status(200).json({
        status: "success",
        messages: formattedMessages
    });
});