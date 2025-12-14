// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { joinServerWithInviteCode } from "@/services/invite.services";

// Join server with inviteCode
// POST method
// Protected route /api/v1/invites/:inviteCode
export const joinServer = catchAsync(async (req, res, next) => {
    const { inviteCode } = req.params;
    const userId = req.user._id;

    const serverId = await joinServerWithInviteCode(inviteCode, userId);

    res.status(200).json({
        status: "success",
        serverId
    });
});