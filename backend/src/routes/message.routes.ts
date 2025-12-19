// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middleware/restrictTo";
import { validate } from "@/middleware/validateSchema";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schemas";
// controllers
import { createChannelMessage } from "@/controllers/message.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(restrictTo(), validate(upsertMessageSchema), createChannelMessage)


export default router;