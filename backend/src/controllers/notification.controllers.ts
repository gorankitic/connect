// utils
import { catchAsync } from "@/lib/utils/catchAsync";
import { formatNotification } from "@/lib/utils/formatting";
// services
import { getAllNotifications } from "@/services/notification.services";

// Get all server member notifications
// GET method
// Protected route /api/v1/servers/:serverId/notifications
// Restricted route to all server members
export const getNotifications = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    const currentMemberId = req.member._id;

    // 1) Handle business logic, call service to find all server member notifications
    const notifications = await getAllNotifications({ currentMemberId, serverId });

    // 2) Format server member notifications
    const formattedNotifications = notifications.map(formatNotification);

    // 3) Return response to the client
    res.status(200).json({
        status: "success",
        results: notifications.length,
        data: {
            notifications: formattedNotifications
        }
    });
});