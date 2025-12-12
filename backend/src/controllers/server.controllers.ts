// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { createNewServer, getAllUserServers, getServerById } from "@/services/server.services";

// Create a new server
// POST method
// Protected route /api/v1/servers
export const createServer = catchAsync(async (req, res, next) => {
    // 1) Request validation is done in the validateSchema middleware
    const { name, avatarUuid } = req.body;
    const owner = req.user._id;

    // 2) Handle business logic to create server document
    const { server } = await createNewServer({ name, avatarUuid, owner });

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
export const getAllServers = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const servers = await getAllUserServers(userId);

    res.status(200).json({
        status: "success",
        servers
    });
});

// Get server by _id
// GET method
// Protected route /api/v1/servers/serverId
export const getServer = catchAsync(async (req, res) => {
    const { serverId } = req.params;

    const server = await getServerById(serverId);

    res.status(200).json({
        status: "success",
        server
    });
});