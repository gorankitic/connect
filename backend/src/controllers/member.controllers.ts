// utils
import { AppError } from "@/lib/utils/AppError";
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMember } from "@/lib/utils/formatting";
// services
import { findAllServerMembers, removeMemberFromServer, updateRole } from "@/services/member.services";

// Get all server members
// GET method
// Protected route /api/v1/servers/:serverId/members
// Restricted route to all members
export const getServerMembers = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    const members = await findAllServerMembers(serverId);

    const formattedMembers = members.map(formatMember);

    res.status(200).json({
        status: "success",
        members: formattedMembers
    });
});

// Update member role
// PATCH method
// Protected route /api/v1/servers/:serverId/members/:memberId
// Restricted route to "ADMIN"
export const updateMemberRole = catchAsync(async (req, res) => {
    const { serverId, memberId } = req.params;
    // Request validation is done in the validateSchema middleware
    const { role } = req.body;
    const adminId = String(req.user._id);

    await updateRole(serverId, memberId, adminId, role);

    res.status(200).json({
        status: "success",
        message: "Member role updated successfully."
    });
});

// Remove (kick) member from server
// DELETE method
// Protected route /api/v1/servers/:serverId/members/:memberId
// Restricted route to "ADMIN"
export const removeMember = catchAsync(async (req, res) => {
    const { serverId, memberId } = req.params;
    const adminId = String(req.member._id);

    // Prevent admin removing himself (single-admin rule)
    if (adminId === memberId) {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    await removeMemberFromServer(serverId, memberId);

    res.status(200).json({
        status: "success",
        message: "Member removed from server successfully.",
    });
});

// Leave server
// DELETE method
// Protected route /api/v1/servers/:serverId/members/leave
// Restricted route to all members
export const leaveServer = catchAsync(async (req, res, next) => {
    const { serverId } = req.params;
    const { _id: memberId, role } = req.member;

    // Prevent admin leaving the server (single-admin rule)
    if (role === "ADMIN") {
        return next(new AppError("You are not authorized to perform this action.", 403));
    }

    await removeMemberFromServer(serverId, memberId)

    res.status(200).json({
        status: "success",
        message: "You have left the server. Goodbye.",
    });
});