// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMessage } from "@/lib/utils/formatting";
// constants
import { CHANNEL_EVENTS, CONVERSATION_EVENTS } from "@/socket/constants";
// services
import { createNewChannelMessage, createNewConversationMessage, getMessagesByChannel, getMessagesByConversation } from "@/services/message.services";
// socket
import { getIO } from "@/socket";

// Create a channel message
// POST method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages
// Restricted route to all server members
export const createChannelMessage = catchAsync(async (req, res) => {
    if (!req.member) throw new Error("No member attached to request");
    const currentMemberId = String(req.member._id);
    const { channelId, serverId } = req.params;
    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to create new channel message document
    const message = await createNewChannelMessage({ content, serverId, channelId, currentMemberId });

    // 3) Format channel message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time event to all channel members
    const io = getIO();
    io.to(`channel:${channelId}`).emit(CHANNEL_EVENTS.MESSAGE_NEW, formattedMessage);

    // 5) Return response to the client
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

    // 1) Handle business logic, call service to find all channel messages
    const { messages, nextCursor } = await getMessagesByChannel({ serverId, channelId, limit, cursor });

    // 2) Format channel messages documents
    const formattedMessages = messages.map(formatMessage);

    // 3) Return response to the client
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
    if (!req.member) throw new Error("No member attached to request");
    const currentMemberId = String(req.member._id);
    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to create new conversation message document
    const message = await createNewConversationMessage({ content, serverId, conversationId, currentMemberId });

    // 3) Format conversation message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time event to conversation members
    const io = getIO();
    io.to(`conversation:${conversationId}`).emit(CONVERSATION_EVENTS.MESSAGE_NEW, formattedMessage);

    // 5) Return response to the client
    res.status(201).json({
        status: "success",
        data: {
            message: formattedMessage
        }
    });
});

// Get all conversation messages
// GET method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages
// Restricted route to all server members
export const getConversationMessages = catchAsync(async (req, res) => {
    if (!req.member) throw new Error("No member attached to request");

    const { serverId, conversationId } = req.params;
    const currentMemberId = String(req.member._id);

    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const cursor = req.query.cursor ? String(req.query.cursor) : undefined;

    // 1) Handle business logic, call service to find all conversation messages
    const { messages, nextCursor } = await getMessagesByConversation({ serverId, conversationId, currentMemberId, limit, cursor });

    // 2) Format conversation messages documents
    const formattedMessages = messages.map(formatMessage);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        results: formattedMessages.length,
        data: {
            messages: formattedMessages,
            nextCursor
        }
    });
});