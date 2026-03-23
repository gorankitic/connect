// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMessage } from "@/lib/utils/formatting";
// constants
import { MESSAGE_TYPE } from "@/lib/constants/message.constants";
import { CHANNEL_EVENTS, CONVERSATION_EVENTS, CHANNEL_ROOM_PREFIX, CONVERSATION_ROOM_PREFIX } from "@/socket/constants";
// services
import { createNewChannelMessage, createNewConversationMessage, deleteMessage, getMessagesByChannel, getMessagesByConversation, updateMessage } from "@/services/message.services";
// socket
import { getIO } from "@/socket";

// Create a channel message
// POST method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages
// Restricted route to all server members
export const createChannelMessage = catchAsync(async (req, res) => {
    const currentMemberId = String(req.member._id);
    const { channelId, serverId } = req.params;
    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to create new channel message document
    const message = await createNewChannelMessage({ content, serverId, channelId, currentMemberId });

    // 3) Format channel message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time "channel:message:create" event to all channel members
    getIO()
        .to(`${CHANNEL_ROOM_PREFIX}:${channelId}`)
        .emit(CHANNEL_EVENTS.MESSAGE_CREATE, formattedMessage);

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

// Update channel message
// PATCH method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages/:messageId
// Restricted route to all server members
export const updateChannelMessage = catchAsync(async (req, res) => {
    const currentMemberId = req.member._id;
    const { messageId, channelId } = req.params;

    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to update channel message
    const message = await updateMessage({ content, messageId, currentMemberId, type: MESSAGE_TYPE.CHANNEL });

    // 3) Format channel message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time "channel:message:update" event to all channel members
    getIO()
        .to(`${CHANNEL_ROOM_PREFIX}:${channelId}`)
        .emit(CHANNEL_EVENTS.MESSAGE_UPDATE, formattedMessage);

    // 5) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            message: formattedMessage
        }
    });
});

// Delete channel message
// DELETE method
// Protected route /api/v1/servers/:serverId/channels/:channelId/messages/:messageId
// Restricted route to all server members
export const deleteChannelMessage = catchAsync(async (req, res) => {
    const { _id: memberId, role: memberRole } = req.member;
    const { messageId, channelId } = req.params;

    // 1) Handle business logic, call service to delete channel message
    const message = await deleteMessage({ messageId, memberId, memberRole, type: MESSAGE_TYPE.CHANNEL });

    // 2) Format message
    const formattedMessage = formatMessage(message);

    // 3) Emit real-time "channel:message:update" event to all channel members
    getIO()
        .to(`${CHANNEL_ROOM_PREFIX}:${channelId}`)
        .emit(CHANNEL_EVENTS.MESSAGE_DELETE, formattedMessage);

    // 4) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            message: formattedMessage,
        },
    });
});

// Create a conversation message
// POST method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages
// Restricted route to all server members
export const createConversationMessage = catchAsync(async (req, res) => {
    const { conversationId, serverId } = req.params;
    const currentMemberId = String(req.member._id);
    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to create new conversation message document
    const message = await createNewConversationMessage({ content, serverId, conversationId, currentMemberId });

    // 3) Format conversation message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time event to conversation members
    getIO()
        .to(`${CONVERSATION_ROOM_PREFIX}:${conversationId}`)
        .emit(CONVERSATION_EVENTS.MESSAGE_CREATE, formattedMessage);

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

// Update conversation message
// PATCH method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages/:messageId
// Restricted route to all server members
export const updateConversationMessage = catchAsync(async (req, res) => {
    const currentMemberId = req.member._id;
    const { messageId, conversationId } = req.params;

    // 1) Request body validation is done in the validateSchema middleware
    const { content } = req.body;

    // 2) Handle business logic, call service to update conversation message
    const message = await updateMessage({ content, messageId, currentMemberId, type: MESSAGE_TYPE.CONVERSATION });

    // 3) Format conversation message document
    const formattedMessage = formatMessage(message);

    // 4) Emit real-time "conversation:message:update" event to all conversation members
    getIO()
        .to(`${CONVERSATION_ROOM_PREFIX}:${conversationId}`)
        .emit(CONVERSATION_EVENTS.MESSAGE_UPDATE, formattedMessage);

    // 5) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            message: formattedMessage
        }
    });
});

// Delete conversation message
// DELETE method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId/messages/:messageId
// Restricted route to all server members
export const deleteConversationMessage = catchAsync(async (req, res) => {
    const { _id: memberId, role: memberRole } = req.member;
    const { messageId, conversationId } = req.params;

    // 1) Handle business logic, call service to delete conversation message
    const message = await deleteMessage({ messageId, memberId, memberRole, type: MESSAGE_TYPE.CONVERSATION });

    // 2) Format message
    const formattedMessage = formatMessage(message);

    // 3) Emit real-time "conversation:message:delete" event to all conversation members
    getIO()
        .to(`${CONVERSATION_ROOM_PREFIX}:${conversationId}`)
        .emit(CONVERSATION_EVENTS.MESSAGE_DELETE, formattedMessage);

    // 4) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            message: formattedMessage,
        },
    });
});