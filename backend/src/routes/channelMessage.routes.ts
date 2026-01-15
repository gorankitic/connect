// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middlewares/restrictTo";
import { validate } from "@/middlewares/validateSchema";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schemas";
// controllers
import { createChannelMessage, getChannelMessages } from "@/controllers/message.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(restrictTo(), getChannelMessages)
    .post(restrictTo(), validate(upsertMessageSchema), createChannelMessage)

export default router;