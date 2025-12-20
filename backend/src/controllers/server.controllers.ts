// utils
import { AppError } from "@/lib/utils/AppError";
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatServer, formatServers } from "@/lib/utils/formatting";
// services
import { createNewInviteCode, createNewServer, deleteServerById, findAllServers, findServerById, updateServerById } from "@/services/server.services";

// Create a new server
// POST method
// Protected route /api/v1/servers
export const createServer = catchAsync(async (req, res) => {
    // 1) Request validation is done in the validateSchema middleware
    const { name, avatarUuid } = req.body;
    const owner = req.user._id;

    // 2) Handle business logic to create server document
    const server = await createNewServer({ name, avatarUuid, owner });

    // 3) Return response to the client
    res.status(201).json({
        status: "success",
        data: {
            serverId: server._id
        }
    });
});

// Get all user servers
// GET method
// Protected route /api/v1/servers
// Restricted route to members
export const getAllServers = catchAsync(async (req, res) => {
    const userId = String(req.user._id);

    // 1) Handle business logic to find all user's server documents
    const servers = await findAllServers({ userId });

    // 2) Format server documents
    const formattedServers = servers.map(formatServers);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        results: servers.length,
        data: {
            servers: formattedServers
        }
    });
});

// Get server
// GET method
// Protected route /api/v1/servers/:serverId
// Restricted route to all server members
export const getServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    // 1) Handle business logic to find server document
    const server = await findServerById({ serverId });

    // 2) Format server document
    const formattedServer = formatServer(server);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        data: {
            server: formattedServer
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
    // 2) Handle business logic, call service to update server document
    await updateServerById({ serverId, body: req.body });

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        message: "Server is updated successfully."
    });
});

// Delete server
// DELETE method
// Protected route /api/v1/servers/:serverId
// Restricted route to "ADMIN"
export const deleteServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    // 2) Handle business logic, call service to delete server document
    await deleteServerById({ serverId });

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        message: "Server is deleted successfully. Goodbye."
    });
});

// Generate new inviteCode
// PATCH method
// Protected route /api/v1/servers/:serverId/invite-code
// Restricted route to "ADMIN"
export const generateNewInviteCode = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    // 2) Handle business logic, call service to update server document
    await createNewInviteCode({ serverId });

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        message: "New invitation code is generated successfully."
    });
});