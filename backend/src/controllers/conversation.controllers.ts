// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatConversation } from "@/lib/utils/formatting";
// services
import { findConversationById, getOrCreate } from "@/services/conversation.services";

// Get or create a new conversation
// POST method
// Protected route /api/v1/servers/:serverId/conversations
// Restricted route to all server members
export const getOrCreateConversation = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    const currentMemberId = req.member._id;

    // 1) Request body validation is done in the validateSchema middleware
    const { memberId } = req.body;

    // 2) Handle business logic, call service to get or create new conversation document
    const conversation = await getOrCreate({ serverId, memberId, currentMemberId });

    // 3) Format conversation document with currentMember and otherMember
    const formattedConversation = formatConversation(conversation, currentMemberId);

    // 4) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            conversation: formattedConversation
        }
    });
});

// Get conversation
// GET method
// Protected route /api/v1/servers/:serverId/conversations/:conversationId
// Restricted route to all server members
export const getConversation = catchAsync(async (req, res) => {
    const { serverId, conversationId } = req.params;
    const currentMemberId = req.member._id;

    // 1) Handle business logic, call service to find conversation document
    const conversation = await findConversationById({ serverId, conversationId, currentMemberId });

    // 2) Format conversation document with currentMember and otherMember
    const formattedConversation = formatConversation(conversation, currentMemberId);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            conversation: formattedConversation
        }
    });
});