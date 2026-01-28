// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middlewares/restrictTo";
import { validate } from "@/middlewares/validateSchema";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schemas";
// controllers
import { createConversationMessage, deleteConversationMessage, getConversationMessages, updateConversationMessage } from "@/controllers/message.controllers";

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(restrictTo(), getConversationMessages)
    .post(restrictTo(), validate(upsertMessageSchema), createConversationMessage)

router
    .route("/:messageId")
    .patch(restrictTo(), validate(upsertMessageSchema), updateConversationMessage)
    .delete(restrictTo(), deleteConversationMessage)

export default router;