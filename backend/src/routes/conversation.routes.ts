// modules
import express from "express";
// middlewares
import { restrictTo } from "@/middleware/restrictTo";
import { validate } from "@/middleware/validateSchema";
// schemas
import { getOrCreateConversationSchema } from "@/lib/schemas/conversation.schema";
// controllers
import { getOrCreateConversation } from "@/controllers/conversation.controllers";
// routers
import conversationMessageRouter from "@/routes/conversationMessage.routes";

const router = express.Router({ mergeParams: true });

router.use("/:conversationId/messages", conversationMessageRouter);

router
    .route("/")
    .post(restrictTo(), validate(getOrCreateConversationSchema), getOrCreateConversation)


export default router;