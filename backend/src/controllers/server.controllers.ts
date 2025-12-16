// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { createNewInviteCode, createNewServer, deleteServerById, getAllUserServers, getServerById, updateServerById } from "@/services/server.services";

// Create a new server
// POST method
// Protected route /api/v1/servers
export const createServer = catchAsync(async (req, res) => {
    // 1) Request validation is done in the validateSchema middleware
    const { name, avatarUuid } = req.body;
    const owner = req.user._id;

    // 2) Handle business logic to create server document
    const server = await createNewServer({ name, avatarUuid, owner });

    res.status(201).json({
        status: "success",
        server: {
            _id: server._id,
        }
    });
});

// Get all user servers
// GET method
// Protected route /api/v1/servers
// Restricted route to members
export const getAllServers = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const servers = await getAllUserServers(userId);

    res.status(200).json({
        status: "success",
        servers
    });
});

// Get server
// GET method
// Protected route /api/v1/servers/:serverId
// Restricted route to all server members
export const getServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    const server = await getServerById(serverId);

    res.status(200).json({
        status: "success",
        server,
        member: {
            _id: req.member._id,
            role: req.member.role,
            name: req.member.user.name,
            avatarUuid: req.member.user.avatarUuid,
        }
    });
});

// Update server
// PATCH method
// Protected route /api/v1/servers/:serverId
// Restricted route to "ADMIN"
export const updateServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    // 1) Request validation is done in the validateSchema middleware
    const { name, avatarUuid } = req.body;
    // 2) Handle business logic, call service to update server document
    await updateServerById(serverId, { name, avatarUuid });

    res.status(200).json({
        status: "success",
        message: "Server is updated successfully."
    });
});

// Generate new inviteCode
// PATCH method
// Protected route /api/v1/servers/:serverId/invite-code
// Restricted route to "ADMIN"
export const generateNewInviteCode = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    await createNewInviteCode(serverId);

    res.status(200).json({
        status: "success",
        message: "New invitation code is generated successfully."
    });
});

// Delete server
// DELETE method
// Protected route /api/v1/servers/:serverId
// Restricted route to "ADMIN"
export const deleteServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    await deleteServerById(serverId);

    res.status(200).json({
        status: "success",
        message: "Server is deleted successfully. Goodbye."
    });
});