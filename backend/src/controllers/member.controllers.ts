// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMember } from "@/lib/utils/formatting";
// services
import { findAllServerMembers, removeMemberFromServer, updateRole } from "@/services/member.services";

// Get all server members
// GET method
// Protected route /api/v1/servers/:serverId/members
// Restricted route to "ADMIN"
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
    const adminId = String(req.user._id);

    await removeMemberFromServer(serverId, memberId, adminId);

    res.status(200).json({
        status: "success",
        message: "Member removed from server successfully.",
    });
});