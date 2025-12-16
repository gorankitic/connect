// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middleware/restrictTo";
import { validate } from "@/middleware/validateSchema";
// schemas
import { createChannelSchema } from "@/lib/schemas/channel.schemas";
// controllers
import { createChannel } from "@/controllers/channel.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(restrictTo("ADMIN", "MODERATOR"), validate(createChannelSchema), createChannel)

export default router;