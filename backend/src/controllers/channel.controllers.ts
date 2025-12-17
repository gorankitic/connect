// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { updateChannelById, createNewChannel, deleteChannelById } from "@/services/channel.services";

// Create channel
// POST method
// Protected route /api/v1/servers/:serverId/channels
// Restricted route to "ADMIN", "MODERATOR"
export const createChannel = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    // 1) Request validation is done in the validateSchema middleware
    const data = req.body;

    // 2) Handle business logic to create channel document
    const channel = await createNewChannel({ data, serverId });

    // 3) Return response to the client
    res.status(201).json({
        status: "success",
        message: `New channel ${channel.name} has been created.`
    });
});

// Update channel
// PATCH method
// Protected route /api/v1/servers/:serverId/channels/:channelId
// Restricted route to "ADMIN", "MODERATOR"
export const updateChannel = catchAsync(async (req, res) => {
    const { serverId, channelId } = req.params;
    // 1) Request validation is done in the validateSchema middleware
    const data = req.body;

    // 2) Handle business logic to update channel document
    const channel = await updateChannelById({ data, serverId, channelId });

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        message: `Channel ${channel.name} has been updated.`
    });
});

// Delete channel
// DELETE method
// Protected route /api/v1/servers/:serverId/channels/:channelId
// Restricted route to "ADMIN", "MODERATOR"
export const deleteChannel = catchAsync(async (req, res) => {
    const { serverId, channelId } = req.params;

    // 1) Handle business logic to update channel document
    const channel = await deleteChannelById({ serverId, channelId });

    // 2) Return response to the client
    res.status(200).json({
        status: "success",
        message: `Channel ${channel.name} has been deleted.`
    });
});