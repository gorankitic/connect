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

    res.status(201).json({
        status: "success",
        message
    });
});

// Get all channel messages
// GET method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages
// Restricted route to all server members
export const getChannelMessages = catchAsync(async (req, res) => {
    const { serverId, channelId } = req.params;

    const messages = await getMessagesByChannel({ serverId, channelId });

    const formattedMessages = messages.map(formatMessage);

    res.status(200).json({
        status: "success",
        messages: formattedMessages
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