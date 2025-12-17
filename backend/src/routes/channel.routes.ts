// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middleware/restrictTo";
import { validate } from "@/middleware/validateSchema";
// schemas
import { upsertChannelSchema } from "@/lib/schemas/channel.schemas";
// controllers
import { createChannel, deleteChannel, updateChannel } from "@/controllers/channel.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(restrictTo("ADMIN", "MODERATOR"), validate(upsertChannelSchema), createChannel)

router
    .route("/:channelId")
    .patch(restrictTo("ADMIN", "MODERATOR"), validate(upsertChannelSchema), updateChannel)
    .delete(restrictTo("ADMIN", "MODERATOR"), deleteChannel)

export default router;