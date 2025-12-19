// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { getOrCreate } from "@/services/conversation.services";

// Get or create new conversation
// POST method
// Protected route /api/v1/servers/:serverId/conversations
// Restricted route to all server members
export const getOrCreateConversation = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    const currentMemberId = String(req.member._id);
    // 1) Request body validation is done in the validateSchema middleware
    const { memberId } = req.body;

    // 2) Handle business logic to get or create new conversation document
    const conversation = await getOrCreate({ serverId, memberId, currentMemberId });

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        conversationId: conversation._id
    });
});