// utils
import { AppError } from "@/lib/utils/AppError";
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatMember } from "@/lib/utils/formatting";
// services
import { findServerMembers, removeMemberFromServer, updateRole } from "@/services/member.services";

// Get all server members
// GET method
// Protected route /api/v1/servers/:serverId/members
// Restricted route to all members
export const getServerMembers = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    // 1) Handle business logic to find all server's member documents
    const members = await findServerMembers({ serverId });

    // 2) Format member documents
    const formattedMembers = members.map(formatMember);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        results: formattedMembers.length,
        data: {
            members: formattedMembers
        }
    });
});

// Get authenticated member
// GET method
// Protected route /api/v1/servers/:serverId/members/me
// Restricted route to all members
export const getMember = catchAsync(async (req, res) => {
    // 1) Member authenticated and authorized in middlewares
    // 2) Member object attached on request object
    // 3) Format member document
    const formattedMember = formatMember(req.member);

    // 4) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            member: formattedMember
        }
    });
});

// Update member role
// PATCH method
// Protected route /api/v1/servers/:serverId/members/:memberId
// Restricted route to "ADMIN"
export const updateMemberRole = catchAsync(async (req, res) => {
    const { serverId, memberId } = req.params;
    // 1) Request validation is done in the validateSchema middleware
    const { role } = req.body;
    const adminId = String(req.user._id);

    // 2) Handle business logic to update member document
    await updateRole({ serverId, memberId, adminId, role });

    // 3) Return response to the client
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
    if (!req.member) throw new Error("No member attached to request");
    const { serverId, memberId } = req.params;
    const adminId = String(req.member._id);

    // 1) Prevent admin removing himself (single-admin rule)
    if (adminId === memberId) {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    // 2) Handle business logic to delete member document
    await removeMemberFromServer({ serverId, memberId });

    // 3) Return response to the client
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
    if (!req.member) throw new Error("No member attached to request");
    const { serverId } = req.params;
    const { _id, role } = req.member;
    const memberId = String(_id);

    // 1) Prevent admin leaving the server (single-admin rule)
    if (role === "ADMIN") {
        return next(new AppError("You are not authorized to perform this action.", 403));
    }

    // 2) Handle business logic to delete member document
    await removeMemberFromServer({ serverId, memberId })

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        message: "You have left the server. Goodbye.",
    });
});