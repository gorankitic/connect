// modules
import express from "express";
// controllers
import { generateLivekitToken } from "@/controllers/livekit.controllers";
// middlewares
import { validate } from "@/middlewares/validateSchema";
// schemas
import { livekitTokenSchema } from "@/lib/schemas/call.schemas";

const router = express.Router();

router.post("/token", validate(livekitTokenSchema), generateLivekitToken);

export default router;