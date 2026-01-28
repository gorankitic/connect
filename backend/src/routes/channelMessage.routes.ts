// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middlewares/restrictTo";
import { validate } from "@/middlewares/validateSchema";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schemas";
// controllers
import { createChannelMessage, deleteChannelMessage, getChannelMessages, updateChannelMessage } from "@/controllers/message.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(restrictTo(), getChannelMessages)
    .post(restrictTo(), validate(upsertMessageSchema), createChannelMessage)

router
    .route("/:messageId")
    .patch(restrictTo(), validate(upsertMessageSchema), updateChannelMessage)
    .delete(restrictTo(), deleteChannelMessage)

export default router;