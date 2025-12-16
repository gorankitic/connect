// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// services
import { createNewChannel } from "@/services/channel.services";

export const createChannel = catchAsync(async (req, res) => {
    const { serverId } = req.params;
    // 1) Request validation is done in the validateSchema middleware
    const data = req.body;

    // 2) Handle business logic to create channel document
    await createNewChannel({ data, serverId });

    res.status(201).json({
        status: "success",
        message: "New channel has been created."
    });
});