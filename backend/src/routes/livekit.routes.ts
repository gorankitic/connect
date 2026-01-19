// modules
import express from "express";
// controllers
import { generateLivekitToken } from "@/controllers/livekit.controllers";
import { validate } from "@/middlewares/validateSchema";
import { livekitTokenSchema } from "@/lib/schemas/call.schamas";

const router = express.Router();

router.post("/token", validate(livekitTokenSchema), generateLivekitToken);

export default router;